import { RequestHandler } from "express";
import TagModel from "../db/models/tag.model.js";
import ProductModel from "../db/models/product.model.js";
import { isValidReq } from "../utils/validate.js";

// add a tag /api/tags/add:post
export const addTagCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['name', 'url', 'meta'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid request!' })

    try {
        const newTag = new TagModel(req.body)
        const tag = await newTag.save()
        res.json({ status: 200, data: tag, message: 'New tag added!' })
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
        if (!tag) return next({ code: 404, message: 'No tag found!' })
        const element = Object.keys(req.body)
        element.forEach(item => tag[item] = req.body[item])
        const data = await tag.save()
        // const update = {...tag._doc, ...req.body}
        // const data = await TagModel.findOneAndUpdate({_id},update,{new: true})
        res.json({ status: 200, data, message: 'Tag has been updated!' })
    } catch (e) {
        next(e)
    }

}

// view a tag /api/tags/view/tagId/:get
export const viwTagCtr: RequestHandler = async (req, res, next) => {

    try {
        const tag = await TagModel.findById(req.params.tagId)
        const products = await ProductModel.find({ tag: req.params.tagId }).select('title ')
        if (!tag) return next({ code: 404, message: 'No tag found!' })
        res.json({ status: 200, data: tag, products })
    } catch (e) {
        next(e)
    }

}

// delete a tag /api/tags/delete/:tagId:delete
export const delTagCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.tagId
    if(!_id) return next({code: 400, message: 'Bad request!'})

    try {
        const tag = await TagModel.findByIdAndDelete(_id)
        if(!tag) return next({code: 404, message: 'No tag found!'})
        res.json({status: 200, message: 'tag has been deleted', data: tag})
    } catch(e) {
        next(e)
    }

}

// list tags /api/tags/list:get
export const LisTagCtr: RequestHandler = async (req, res, next) => {

    try {
        const tags = await TagModel.find()
        if(tags.length < 1) return next({code: 404, message: 'No tag found!'})
        res.json({status: 200, message: 'Tag found', data: tags})
    } catch (e) {
        next(e)
    }

}