import e, { RequestHandler } from "express"
import ProductModel from "../db/models/product.model.js"
import { isValidReq } from "../utils/validate.js"
import MetaModel from "../db/models/meta.model.js"
import { queryHandler } from '../utils/filter.js'


// view a product /api/prod/view
export const viewProdCtr: RequestHandler = async (req, res, next) => {
    const _id = req.params.productId
    try {
        const product = await ProductModel.findById(_id).populate({
            path: 'images.main images.gallery category tag meta'
        })
        if (!product) return next({ code: 404, message: "No product found!" })
        res.json({ status: 200, data: product, message: "Product found." })
    } catch (e) {
        next(e)
    }

}

// products list /api/prod/list
export const listProdCtr: RequestHandler = async (req, res, next) => {

    const { createdAt, updatedAt, limit, skip, price } = queryHandler(req.query)
    try {
        const products = await ProductModel.find().populate({
            path: 'images.main category tag',
            select: 'filepath name url',

        }).limit(limit).skip(skip).sort(createdAt).sort(updatedAt).sort('price').select('-content')
        if (!products.length) return next({ code: 404, message: 'No product found!' })
        res.json({ status: 200, data: products, message: 'Products found' })

    } catch (e) {
        next(e)
    }

}

// add new product /api/prod/add
export const addProdCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['title', 'excerpt', 'content', 'images', 'category', 'tag', 'meta', 'owner', 'url'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid Request' })
    try {

        const newMeta = new MetaModel(req.body.meta)
        delete req.body.meta

        const newProduct = new ProductModel({ ...req.body, owner: req.user?._id, meta: newMeta._id })

        const meta = await newMeta.save()
        const product = await newProduct.save()
        res.json({ status: 200, message: 'New product added.', data: { meta, product } })

    } catch (e) {
        next(e)
    }

}

// update a product /api/prod/update
export const updateProdCtr: RequestHandler = async (req, res, next) => {
    const _id = req.params.productId
    const element = Object.keys(req.body)
    const isValidRB = isValidReq(req.body, ['title', 'excerpt', 'content', 'price', 'url', 'images', 'category', 'tag', 'meta', 'owner'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid field!' })
    try {
        const product: any = await ProductModel.findOne({ _id, owner: req.user?._id })
        element.forEach(item => product[item] = req.body[item])
        await product.save()
        res.json({ status: 200, data: product, message: 'Your product has been updated.' })
    } catch (e) {
        next(e)
    }

}

// delete a product /api/prod/delete
export const deleteProdCtr: RequestHandler = async (req, res, next) => {
    const _id = req.params.productId
    try {
        const product = await ProductModel.findOneAndDelete({ _id, owner: req.user?._id })

    } catch (e) {

    }

}