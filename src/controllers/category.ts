import { RequestHandler } from "express";
import CategoryModel from "../db/models/category.model.js";
import ProductModel from "../db/models/product.model.js";
import MetaModel from "../db/models/meta.model.js";
import { isValidReq } from "../utils/validate.js";

// add a category /api/cate/add:post
export const addCategoryCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['name', 'url', 'meta', 'category'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid request!' })

    let categoryMeta
    if (req.body.meta) categoryMeta = req.body.meta

    try {
        delete req.body.meta
        const newCategory = new CategoryModel({ ...req.body, category: req.body.category ? req.body.category : undefined })
        const newMeta = new MetaModel({ ...categoryMeta, link: newCategory._id })
        newCategory.meta = newMeta._id

        const category = await newCategory.save()
        const meta = await newMeta.save()
        if (req.body.category) await CategoryModel.findOneAndUpdate({ _id: req.body.category }, { $push: { children: newCategory._id } })
        res.json({ status: 200, data: { category, meta }, message: 'New category added!' })
    } catch (e) {
        next(e)
    }
}

// edit a category /api/cate/edit/:categoryId:patch
export const ediCategoryCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.categoryId
    const isValidRB = isValidReq(req.body, ['name', 'url', 'meta', 'category'])
    if (!isValidRB || !_id) return next({ code: 400, message: 'Bad Request!' })

    let categoryMeta: any
    if (req.body.meta) {
        categoryMeta = req.body.meta
        delete req.body.meta
    }

    try {
        const data: { saved?: any, meta?: any, removed?: any, assigned?: any } = {}
        const category: any = await CategoryModel.findById(_id)
        if (!category) return next({ code: 404, message: 'No category was found!' })

        let meta: any
        meta = await MetaModel.findById(category.meta)
        
        if (categoryMeta && meta) Object.keys(categoryMeta).forEach(item => meta[item] = categoryMeta[item])
        
        if (!meta && categoryMeta) {
            meta = new MetaModel({ categoryMeta, link: category._id })
            category.meta = meta._id
        }

        if (req.body.category || req.body.category === 'none') data.removed = await CategoryModel.findByIdAndUpdate(category.category, { $pull: { children: category._id } })
        if (req.body.category !== 'none') data.assigned = await CategoryModel.findByIdAndUpdate(req.body.category, { $push: { children: category._id } })

        if (req.body.category === 'none') req.body.category = undefined
        Object.keys(req.body).forEach(item => category[item] = req.body[item])

        data.saved = await category.save()
        if (categoryMeta && meta) data.meta = await meta.save()

        res.json({ status: 200, data, message: 'Category updated!' })
    } catch (e) {
        next(e)
    }

}

// view a category /api/cate/view/:categoryId:get
export const getCategoryCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.categoryId

    try {
        const category = await CategoryModel.findById(_id).populate({
            path: 'meta',
            select: 'title description keyprase'
        })
        if (!category) return next({ code: 404, message: 'No category was found!' })
        const products = await ProductModel.find({ category: { $in: [category._id, ...category.children] } }).select('title images.main url price').populate({
            path: 'images.main',
            select: 'filepath name'
        })
        res.json({ status: 200, data: { category, products }, message: 'Category and its products' })
    } catch (e) {
        next(e)
    }

}

// delete a category /api/cate/delete/:categoryId:delete
export const delCategoryCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.categoryId
    if (!_id) return next({ code: 400, message: 'Bad request!' })

    try {
        const category = await CategoryModel.findByIdAndDelete(_id)
        if (!category) return next({ code: 404, message: 'No category was found!' })
        const meta = await MetaModel.findByIdAndDelete(category.meta)
        if (category.category) await CategoryModel.findByIdAndUpdate(category.category, { $pull: { children: category._id } })
        if (category.children.length) await CategoryModel.updateMany({ category: _id }, { $unset: { category: 1 } })
        res.json({ status: 200, data: { category, meta }, message: 'Category deleted' })
    } catch (e) {
        next(e)
    }

}

// list categories /api/cate/list:get
export const LisCategoryCtr: RequestHandler = async (req, res, next) => {

    try {
        const categories = await CategoryModel.find()
        if (categories.length < 1) return next({ code: 404, message: 'No category was found!' })
        res.json({ status: 200, message: 'Category found', data: categories })
    } catch (e) {
        next(e)
    }

}