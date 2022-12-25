import { RequestHandler } from "express"
import CartModel from "../db/models/cart.model.js"
import ProductModel from "../db/models/product.model.js"
import { isValidReq } from "../utils/validate.js"


// add to cart /api/cart/add :post
export const addCartCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['prodId', 'quantity'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid field!' })

    let data: any
    let message: string = ''

    try {
        const oldCart = await CartModel.findOne({ userId: req.user?._id })

        if (!oldCart) {
            const product = await ProductModel.findById(req.body.prodId)
            if (!product) return next({ code: 404, message: 'No product found!' })
            const newCart = new CartModel({ list: [{ prodId: product._id, price: product.price, quantity: req.body.quantity }], userId: req.user?._id, })
            data = await newCart.save()
            message = 'A new cart has been created.'
        } else {
            const product = await ProductModel.findById(req.body.prodId)
            if (!product) return next({ code: 404, message: 'No product found!' })

            // I have to work here add to cart and update
            oldCart.list.filter(item => {
                if(product._id.equals(item.prodId)) item.quantity + 1
            })
            

            message = 'The product added to cart.'
        }

        res.json({ status: 200, data, message })
    } catch (e) {
        next(e)
    }

}

// update cart /api/cart/update :patch
export const updCartCtr: RequestHandler = async (req, res, next) => {



}

// view cart /api/cart/view :view
export const viwCartCtr: RequestHandler = async (req, res, next) => {



}

// delete cart /api/cart/delete :delete
export const delCartCtr: RequestHandler = async (req, res, next) => {



}