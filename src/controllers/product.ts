import { RequestHandler } from "express"
import ProductModel from "../db/models/product.model.js"
import { isValidReq } from "../utils/validate.js"

// view a product /api/prod/view
export const viewProdCtr: RequestHandler = async (req, res, next) => {



}

// products list /api/prod/list
export const listProdCtr: RequestHandler = async (req, res, next) => {



}

// add new product /api/prod/add
export const addProdCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['title', 'description', 'category', 'tag', 'meta', 'owner', 'url'])

    if (!isValidRB) next({ code: 400, message: 'Invalid Request' })

    try {
        const newProduct = new ProductModel(req.body)
        const product = await newProduct.save()
        res.json({ status: 200, message: 'New product added.', data: product })
    } catch (e) {
        next(e)
    }

}

// update a product /api/prod/update
export const updateProdCtr: RequestHandler = async (req, res, next) => {



}

// delete a product /api/prod/delete
export const deleteProdCtr: RequestHandler = async (req, res, next) => {



}