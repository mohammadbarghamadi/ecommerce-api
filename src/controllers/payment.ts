import { RequestHandler } from "express";
import CartModel from "../db/models/cart.model.js";
import OrderModel from "../db/models/order.model.js";
import { ZarinGateway } from "../utils/payment.js";
import { PaymentState } from "../types/types.js"

// Payment request /api/paym/payment:post
export const PayRequestCtr: RequestHandler = async (req, res, next) => {

    try {
        const cart = await CartModel.findOne({ userId: req.cred.user._id })
        if (!cart) return next({ code: 400, message: 'No cart found' })

        const payment = {
            amount: cart.amount,
            description: req.body.description || 'Product payment.',
            mobile: req.cred.user.mobile!,
            email: req.cred.user.email!
        }

        const { authority, code } = await ZarinGateway(payment)
        if (code !== 100 && typeof authority !== 'string') return next({ code: 400, message: 'Incomplete payment request!' })
        cart.payment = { authority, code, state: PaymentState.Pending, date: Date.now() + 24 * 60 * 60 * 1000 }
        const info = await cart.save()
        res.json({ status: 200, data: { info, redirect: `${process.env.ZARIN_PAY_PGSTART}${authority}` } })

    } catch (e) {
        next(e)
    }

}

// Checkout payment /api/paym/checkout:post
export const CheckoutCtr: RequestHandler = async (req, res, next) => {

    const { Authority, Status } = req.body

    try {
        const cart = await CartModel.findOne({ userId: req.cred.user._id, 'payment.authority': Authority, 'payment.state': PaymentState.Pending, 'payment.date': { $gte: Date.now() } })


        if (!cart) return next({ code: 404, message: 'Invalid Payment request, no cart found!' })

        if (Status === 'OK') {
            cart.payment.state = PaymentState.Success
            const { userId, list, payment, amount } = cart
            const newOrder = new OrderModel({ userId, list, payment, amount })
            const order = await newOrder.save()
            await cart.delete()
            res.json({ status: 200, data: order, message: 'The payment is done.' })

        } else if (Status === 'NOK') {
            cart.payment.state = PaymentState.Cancel
            res.json({ status: 200, message: 'The payment is canceled.' })
        }

    } catch (e) {
        next(e)
    }

}