import { RequestHandler } from "express"
import FileModel from "../db/models/file.model.js"
import { ROLES } from "../middlewares/role.js"
import { genFilePath } from "../utils/file.js"
import { isValidReq } from "../utils/validate.js"


// file upload /api/file/upload:post
export const fileUploadCtr: RequestHandler = async (req, res, next) => {
    try {
        const files: any = req.files!
        const items: {}[] = []

        Object.keys(files).forEach(item => {
            const { name, size, encoding, mimetype, md5, mv } = files[item]
            const filepath = genFilePath(name, mimetype)

            mv(filepath, (err: Error) => {
                if (err) return next({ code: 500, message: `Error while wrting file to disk! ${name}` })
            })
            items.push({ name, md5, size, mimetype, encoding, filepath, userId: req.cred.user._id })
        })
        const newFiles = await FileModel.insertMany(items)

        res.json({ status: 200, data: newFiles })
    } catch (e) {
        next(e)
    }
}

// file update /api/file/update/:fileId:patch
export const fileUpdateCtr: RequestHandler = async (req, res, next) => {
    const _id = req.params.fileId
    const element = Object.keys(req.body)
    const isValidRB = isValidReq(req.body, ['name','userId'])
    if (!isValidRB) return next({ code: 400, message: 'Bad request!' })
    if (req.cred.user.role > ROLES.Admin && req.body.userId) return next({code: 401, message: 'You have insufficient permission!'}) 
    try {
        let file: any
        if (req.cred.user.role <= ROLES.Admin) file = await FileModel.findOne({ _id })
        else file = await FileModel.findOne({ _id, userId: req.cred.user._id })
        if (!file) return next({ code: 404, message: 'No file was found!' })
        element.forEach(item => file[item] = req.body[item])
        await file.save()
        res.json({ status: 200, data: file, message: 'File updated.' })
    } catch (e) {
        next(e)
    }
}

// file delete /api/file/delete/:fileId:delete
export const fileDeleteCtr: RequestHandler = async (req, res, next) => {
    const _id = req.params.fileId

    try {
        let file
        if (req.cred.user.role <= ROLES.Admin) file = await FileModel.findOneAndDelete({ _id })
        else file = await FileModel.findOneAndDelete({ _id, userId: req.cred.user._id })
        if (!file) return next({ code: 400, message: 'No file was found' })
        res.json({ status: 200, data: file, message: 'File deleted!' })
    } catch (e) {
        next(e)
    }
}

// file view /api/file/view/:fileId:get
export const fileViewCtr: RequestHandler = async (req, res, next) => {
    const _id = req.params.fileId
    try {
        let file
        if (req.cred.user.role <= ROLES.Admin) file = await FileModel.findOne({ _id })
        else file = await FileModel.findOne({ _id, userId: req.cred.user._id })
        if (!file) return next({ code: 404, message: 'File not found!' })
        res.json({ status: 200, data: file, message: 'File found.' })
    } catch (e) {
        next(e)
    }
}

// file list /api/file/list/:fileId:get
export const fileListCtr: RequestHandler = async (req, res, next) => {

    try {
        let files
        if (req.cred.user.role <= ROLES.Admin) files = await FileModel.find({})
        else files = await FileModel.find({ userId: req.cred.user._id })
        if (!files.length) return next({ code: 404, message: 'No file was found!' })
        res.json({ status: 200, data: files, message: 'Files retrieved.' })
    } catch (e) {
        next(e)
    }
}