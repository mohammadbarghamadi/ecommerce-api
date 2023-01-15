import { RequestHandler } from "express";
import TagModel from "../db/models/tag.model.js";
import ProductModel from "../db/models/product.model.js";
import { isValidReq } from "../utils/validate.js";
import MetaModel from "../db/models/meta.model.js";

// add a tag /api/tags/add:post
export const addTagCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['name', 'url', 'meta'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid request!' })

    try {
        const newTag = new TagModel(req.body)
        const newMeta = new MetaModel({ ...req.body.meta, link: newTag._id })
        newTag.meta = newMeta._id

        const tag = await newTag.save()
        const meta = await newMeta.save()
        res.json({ status: 200, data: { tag, meta }, message: 'New tag added!' })
    } catch (e) {
        next(e)
    }

}

// edit a tag /api/tags/edit/:tagId:get
export const ediTagCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.tagId
    const isValidRB = isValidReq(req.body, ['name', 'url', 'meta'])
    if (!isValidRB || !_id) return next({ code: 400, message: 'Bad Request!' })

    try {
        const tag: any = await TagModel.findById(_id)
        if (!tag) return next({ code: 404, message: 'No tag was found!' })

        let meta: any
        meta = await MetaModel.findById(tag.meta)

        if (meta && req.body.meta) Object.keys(req.body.meta).forEach(item => meta[item] = req.body.meta[item])

        if (!meta && req.body.meta) {
            meta = new MetaModel({ ...req.body.meta, link: tag._id })
            tag.meta = meta._id
        }

        delete req.body.meta

        Object.keys(req.body).forEach(item => tag[item] = req.body[item])

        meta = await meta.save()
        const updatedTag = await tag.save()
        res.json({ status: 200, data: { updatedTag, meta }, message: 'Tag updated!' })
    } catch (e) {
        next(e)
    }

}

// view a tag /api/tags/view/:get
export const getTagCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.tagId

    try {
        const tag = await TagModel.findById(_id).populate({
            path: 'meta',
            select: 'title description keyphrase'
        })
        const products = await ProductModel.find({ tag: _id }).select('title images.main url price').populate({
            path: 'images.main',
            select: 'filepath name'
        })
        if (!tag) return next({ code: 404, message: 'No tag was found!' })
        res.json({ status: 200, data: tag, products })
    } catch (e) {
        next(e)
    }

}

// delete a tag /api/tags/delete/:tagId:delete
export const delTagCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.tagId

    try {
        const tag = await TagModel.findByIdAndDelete(_id)
        if (!tag) return next({ code: 404, message: 'No tag was found!' })
        let meta
        if (tag.meta) meta = await MetaModel.findByIdAndRemove(tag.meta)
        const products = await ProductModel.updateMany({ tag: tag._id }, { $pull: { tag: tag._id } })
        res.json({ status: 200, data: { tag, meta, products }, message: 'tag deleted' })
    } catch (e) {
        next(e)
    }

}

// list tags /api/tags/list:get
export const LisTagCtr: RequestHandler = async (req, res, next) => {

    try {
        const tags = await TagModel.find()
        if (tags.length < 1) return next({ code: 404, message: 'No tag was found!' })
        res.json({ status: 200, message: 'Tag found', data: tags })
    } catch (e) {
        next(e)
    }

}