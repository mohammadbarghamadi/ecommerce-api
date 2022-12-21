import { RequestHandler } from "express";
import CategoryModel from "../db/models/category.model.js";
import ProductModel from "../db/models/product.model.js";
import { isValidReq } from "../utils/validate.js";

// add a category /api/cate/add
export const addCategoryCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['name', 'url', 'meta'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid request!' })

    try {
        const newCategory = new CategoryModel(req.body)
        const category = await newCategory.save()
        res.json({ status: 200, data: category, message: 'New category added!' })
    } catch (e) {
        next(e)
    }

}

// edit a category /api/cate/edit
export const ediCategoryCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.categoryId
    const isValidRB = isValidReq(req.body, ['name', 'url', 'meta'])
    if (!isValidRB || !_id) return next({ code: 400, message: 'Bad Request!' })

    try {
        const category: any = await CategoryModel.findById(_id)
        if (!category) return next({ code: 404, message: 'No category found!' })
        const element = Object.keys(req.body)
        element.forEach(item => category[item] = req.body[item])
        const data = await category.save()
        // const update = {...category._doc, ...req.body}
        // const data = await CategoryModel.findOneAndUpdate({_id},update,{new: true})
        res.json({ status: 200, data, message: 'Category has been updated!' })
    } catch (e) {
        next(e)
    }

}

// view a category /api/cate/view
export const viwCategoryCtr: RequestHandler = async (req, res, next) => {

    try {
        const category = await CategoryModel.findById(req.params.categoryId)
        const products = await ProductModel.find({ category: req.params.categoryId }).select('title ')
        if (!category) return next({ code: 404, message: 'No category found!' })
        res.json({ status: 200, data: category, products })
    } catch (e) {
        next(e)
    }

}

// delete a category /api/cate/delete
export const delCategoryCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.categoryId
    if(!_id) return next({code: 400, message: 'Bad request!'})

    try {
        const category = await CategoryModel.findByIdAndDelete(_id)
        if(!category) return next({code: 404, message: 'No category found!'})
        res.json({status: 200, message: 'Category has been deleted', data: category})
    } catch(e) {
        next(e)
    }

}

// list categories /api/cate/list
export const LisCategoryCtr: RequestHandler = async (req, res, next) => {

    try {
        const categories = await CategoryModel.find()
        if(categories.length < 1) return next({code: 404, message: 'No category found!'})
        res.json({status: 200, message: 'Category found', data: categories})
    } catch (e) {
        next(e)
    }

}