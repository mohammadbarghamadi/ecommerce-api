import { RequestHandler } from "express";
import OrderModel from "../db/models/order.model.js";
import { ROLES } from "../middlewares/role.js";


export const listOrderCtr: RequestHandler = async (req, res, next) => {

    let orders

    try {
        if (req.user?.role! <= ROLES.Seller) orders = await OrderModel.find({})
        else orders = await OrderModel.find({ userId: req.user?._id })
        if (!orders.length) return next({ code: 404, message: 'No order found!' })
        res.json({ status: 200, data: orders, message: 'Orders found' })
    } catch (e) {
        next(e)
    }

}


export const viewOrderCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.orderId
    let order

    try {
        if (req.user?.role! <= ROLES.Seller) order = await OrderModel.findOne({_id})
        else order = await OrderModel.find({_id, userId: req.user?._id })
        if (!order) return next({ code: 404, message: 'Order not found!' })
    } catch (e) {
        next(e)
    }

}