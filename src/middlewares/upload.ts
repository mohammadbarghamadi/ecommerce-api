import { Request, Response, NextFunction, RequestHandler } from "express";


type FilePayExists = () => void
type FileExtension = () => void
type FileSizeLimit = () => void


// look for file pay exist
export const fpExist: RequestHandler = (req, res, next) => {

    if (!req.files) return res.json({ status: 404, message: 'No file was found!' })
    next()

}

// look for file size limit
export const fsLimit = (fileSize: number = 1 * 1024 * 1024) => (req: Request, res: Response, next: NextFunction) => {

    const files: any = req.files!
    const limitList: string[] = []
    Object.keys(files).forEach(item => {
        if (files[item].size > fileSize) limitList.push(files[item].name)
    })
    if (limitList.length) return res.json({ status: 400, message: `File size is too big: ${limitList.toString()}` })
    next()
}

// look for file extension
export const fxLimit = (extensions: string[] = ['jpeg','jpg','png','pdf']) => (req: Request, res: Response, next: NextFunction) => {

    const files: any = req.files!
    let isMatch = true
    Object.keys(files).forEach(item => {
        if (!extensions.includes(files[item].mimetype.split('/')[1])) return isMatch = false
    })
    if (!isMatch) return res.json({ status: 400, message: 'File extensions are not allowed!' })
    next()
}