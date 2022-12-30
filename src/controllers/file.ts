import { RequestHandler } from "express"
import FileModel from "../db/models/file.model.js"
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
            items.push({ name, md5, size, mimetype, encoding, filepath, userId: req.user?._id })
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
    const isValidRB = isValidReq(req.body, ['name'])
    if (!isValidRB) return next({ code: 400, message: 'Bad request!' })
    try {
        const file: any = await FileModel.findOne({ _id, userId: req.user?._id })
        if (!file) return next({ code: 404, message: 'No file found!' })
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
        const file = await FileModel.findOneAndDelete({ _id, userId: req.user?._id })
        if (!file) return next({ code: 400, message: 'No file found' })
        res.json({ status: 200, data: file, message: 'File deleted!' })
    } catch (e) {
        next(e)
    }
}

// file view /api/file/view/:fileId:get
export const fileViewCtr: RequestHandler = async (req, res, next) => {
    const _id = req.params.fileId
    try {
        const file = await FileModel.findOne({ _id, userId: req.user?._id })
        if (!file) return next({ code: 404, message: 'File not found!' })
        res.json({ status: 200, data: file, message: 'File found.' })
    } catch (e) {
        next(e)
    }
}

// file list /api/file/list/:fileId:get
export const fileListCtr: RequestHandler = async (req, res, next) => {

    try {
        const files = await FileModel.find({ userId: req.user?._id })
        if (!files.length) return next({ code: 404, message: 'No file found!' })
        res.json({ status: 200, data: files, message: 'Files retrived.' })
    } catch (e) {
        next(e)
    }
}