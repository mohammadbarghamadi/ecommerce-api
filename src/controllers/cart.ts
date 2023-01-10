import { RequestHandler } from "express"
import { CartArrayInt } from "../types/types.js"
import CartModel from "../db/models/cart.model.js"
import ProductModel from "../db/models/product.model.js"
import { isValidReq } from "../utils/validate.js"


// add to cart /api/cart/add:post
export const addCartCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['prodId', 'quantity'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid field!' })

    let data: any
    let message: string = ''

    try {
        const oldCart = await CartModel.findOne({ userId: req.cred.user._id })

        if (!oldCart) {
            const product = await ProductModel.findById(req.body.prodId)
            if (!product) return next({ code: 404, message: 'No product was found!' })
            const newCart = new CartModel({ list: [{ prodId: product._id, price: product.price, quantity: req.body.quantity }], userId: req.cred.user._id, })
            data = await newCart.save()
            message = 'A new cart created.'
        } else {
            let isSameProdId = false
            const product = await ProductModel.findById(req.body.prodId)
            if (!product) return next({ code: 404, message: 'No product was found!' })

            oldCart.list = oldCart.list.filter(item => {
                if (product._id.equals(item.prodId)) {
                    item.quantity++
                    isSameProdId = true
                }
                return item
            })

            if (!isSameProdId) oldCart.list.push({ prodId: product._id, price: product.price, quantity: 1 })
            data = await oldCart.save()
            message = 'The product added to cart.'
        }

        res.json({ status: 200, data, message })
    } catch (e) {
        next(e)
    }

}

// update cart /api/cart/update:patch
export const updCartCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['list'])
    
    if (!isValidRB || !Array.isArray(req.body.list))
        return next({ code: 400, message: 'Bad request sent!' })

    try {
        const oldCart = await CartModel.findOne({ userId: req.cred.user._id })
        if (!oldCart) return next({ code: 404, message: 'No cart found!' })

        oldCart.list.forEach(item => {
            req.body.list.forEach((update: CartArrayInt) => {
                if (item.prodId.equals(update.prodId)) item.quantity = update.quantity
            })
        })

        oldCart.list = oldCart.list.filter(item => item.quantity !== 0)
        const updated = await oldCart.save({ validateBeforeSave: true })

        res.json({ status: 200, data: updated, message: 'Cart updated.' })
    } catch (e) {
        next(e)
    }

}

// view cart /api/cart/view:view
export const getCartCtr: RequestHandler = async (req, res, next) => {

    try {
        const cart = await CartModel.findOne({ userId: req.cred.user._id })
        if (!cart) return next({ code: 404, message: 'No cart found!' })
        res.json({ status: 200, data: cart, message: 'Cart found.' })
    } catch (e) {
        next(e)
    }

}

// delete cart /api/cart/delete:delete
export const delCartCtr: RequestHandler = async (req, res, next) => {

    try {
        const cart = await CartModel.findOneAndDelete({ userId: req.cred.user._id })
        if (!cart) return next({ code: 200, message: 'No cart found!' })
        res.json({ status: 200, message: 'Cart removed!' })
    } catch (e) {
        next(e)
    }

}