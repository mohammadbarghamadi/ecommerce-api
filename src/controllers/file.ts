import { RequestHandler } from "express"
import path, { dirname } from 'path'
import { fileURLToPath } from "url"
import FileModel from "../db/models/file.model.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

// file upload /api/file/upload:post
export const fileUploadCtr: RequestHandler = async (req, res, next) => {

    try {
        const files: any = req.files!
        const items: {}[] = []

        Object.keys(files).forEach(item => {
            const { size, encoding, mimetype, md5, mv } = files[item]
            const fileName = mimetype.split('/')[0] + '-' + Date.now() + '-' + Math.floor(Math.random() * 999999999) + '.' + mimetype.split('/')[1]
            const filepath = path.join(__dirname, `../files/${mimetype.split('/')[0]}s/`, fileName)
            mv(filepath, (err: Error) => {
                if (err) return next({ code: 500, message: `Error while wrting file to disk! ${files[item].name}` })
            })
            items.push({ name: files[item].name, md5, size, mimetype, encoding, filepath, userId: req.user?._id })

        })
        const newFiles = await FileModel.insertMany(items)

        res.json({ status: 200, data: newFiles })
    } catch (e) {
        next(e)
    }

}

// file update /api/file/update:patch
export const fileUpdateCtr: RequestHandler = async (req, res, next) => {

}

// file delete /api/file/delete:delete
export const fileDeleteCtr: RequestHandler = async (req, res, next) => {

}

// file view /api/file/view:get
export const fileViewCtr: RequestHandler = async (req, res, next) => {

}

// file list /api/file/list:get
export const fileListCtr: RequestHandler = async (req, res, next) => {

} 