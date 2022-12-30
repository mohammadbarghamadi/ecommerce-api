import { RequestHandler } from "express";
import OrderModel from "../db/models/order.model.js";
import { ROLES } from "../middlewares/role.js";

// list orders /api/orde/list:get
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

// view an order /api/orde/view/:orderId:get
export const viewOrderCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.orderId
    let order

    try {
        if (req.user?.role! <= ROLES.Seller) order = await OrderModel.findOne({_id}).populate({path: 'userId',select: 'name phone'})
        else order = await OrderModel.findOne({_id, userId: req.user?._id }).populate({path: 'userId',select: 'name phone'})
        if (!order) return next({ code: 404, message: 'Order not found!' })
        res.json({status: 200, data: order, message: 'Order found.'})
    } catch (e) {
        next(e)
    }

}