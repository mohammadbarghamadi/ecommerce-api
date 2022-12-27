import { RequestHandler } from "express";
import CartModel from "../db/models/cart.model.js";
import OrderModel from "../db/models/order.model.js";
import { ZarinGateway } from "../utils/payment.js";
import { PaymentState } from "../types/types.js"

export const PayRequestCtr: RequestHandler = async (req, res, next) => {

    try {
        const cart = await CartModel.findOne({ userId: req.user?._id })
        if (!cart) return next({ code: 400, message: 'No cart found' })

        const payment = {
            amount: cart.amount,
            description: req.body.description || 'Product payment.',
            mobile: req.user?.mobile!,
            email: req.user?.email!
        }

        const { authority, code } = await ZarinGateway(payment)
        if (code !== 100 && typeof authority !== 'string') return next({ code: 400, message: 'Incomplete payment request!' })
        cart.payment = { authority, code, state: PaymentState.Pending }
        const info = await cart.save()
        res.json({ status: 200, data: { info, redirect: `${process.env.ZARIN_PAY_PGSTART}${authority}` } })

    } catch (e) {
        next(e)
    }

}