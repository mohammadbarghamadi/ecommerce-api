import { RequestHandler } from "express"
import ProductModel from "../db/models/product.model.js"
import { isValidReq } from "../utils/validate.js"
import MetaModel from "../db/models/meta.model.js"
import { queryHandler } from '../utils/filter.js'
import { ROLES } from "../middlewares/role.js"


// view a product /api/prod/view/:productId:get
export const getProdCtr: RequestHandler = async (req, res, next) => {
    const _id = req.params.productId
    try {
        const product = await ProductModel.findById(_id).populate({
            path: 'images.main images.gallery category tag meta'
        })
        if (!product) return next({ code: 404, message: "No product was found!" })
        res.json({ status: 200, data: product, message: "Product found." })
    } catch (e) {
        next(e)
    }

}

// products list /api/prod/list:get
export const listProdCtr: RequestHandler = async (req, res, next) => {

    const { createdAt, updatedAt, limit, skip, price } = queryHandler(req.query)
    try {
        const products = await ProductModel.find().populate({
            path: 'images.main images.gallery category tag',
            select: 'filepath name url'

        }).limit(limit).skip(skip).sort({ price }).sort({ createdAt })
        if (!products.length) return next({ code: 404, message: 'No product was found!' })
        res.json({ status: 200, data: products, message: 'Products found' })

    } catch (e) {
        next(e)
    }

}

// add new product /api/prod/add:post
export const addProdCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['title', 'excerpt', 'content', 'images', 'category', 'tag', 'meta', 'price', 'owner', 'url'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid Request' })

    try {

        const newMeta = new MetaModel({...req.body.meta})
        delete req.body.meta
        const newProduct = new ProductModel({ ...req.body, owner: req.cred.user._id, meta: newMeta._id })
        newMeta.link = newProduct._id

        const meta = await newMeta.save()
        const product = await newProduct.save()
        res.json({ status: 200, message: 'New product added.', data: { meta, product } })

    } catch (e) {
        next(e)
    }

}

// update a product /api/prod/update/:productId:get
export const updateProdCtr: RequestHandler = async (req, res, next) => {
    const _id = req.params.productId
    let product: any
    const isValidRB = isValidReq(req.body, ['title', 'excerpt', 'content', 'price', 'url', 'images', 'category', 'tag', 'meta', 'owner'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid field!' })
    try {
        if (req.cred.user.role! <= ROLES.Admin) product = await ProductModel.findOne({ _id })
        else product = await ProductModel.findOne({ _id, owner: req.cred.user._id })
        if (!product) return next({ code: 404, message: 'No product was found!' })

        let meta: any
        meta = await MetaModel.findById(product.meta._id)
        
        if (meta && req.body.meta) Object.keys(req.body.meta).forEach(item => meta[item] = req.body.meta[item])
        
        if (!meta && req.body.meta) {
            meta = new MetaModel({...req.body.meta, link: product._id})
            product.meta = meta._id
        }
        
        delete req.body.meta
        
        Object.keys(req.body).forEach(item => product[item] = req.body[item])
        
        await meta.save()
        await product.save()
        res.json({ status: 200, data: { product, meta }, message: 'Your product updated.' })
    } catch (e) {
        next(e)
    }

}

// delete a product /api/prod/delete/:productId:get
export const deleteProdCtr: RequestHandler = async (req, res, next) => {
    const _id = req.params.productId
    let product: any
    try {
        if (req.cred.user.role! <= ROLES.Admin) product = await ProductModel.findOneAndDelete({ _id })
        else product = await ProductModel.findOneAndDelete({ _id, owner: req.cred.user._id })
        if (!product) return next({ code: 404, message: 'No product was found!' })
        res.json({ status: 200, message: 'The product deleted!', data: product })
    } catch (e) {
        next(e)
    }

}