import { RequestHandler } from "express";
import AddressModel from "../db/models/address.model.js";
import { ROLES } from "../middlewares/role.js";
import { isValidReq } from "../utils/validate.js";


// add an address /api/addr/add:post
export const addAddressCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['country', 'provState', 'city', 'address', 'postalcode'])
    if (!isValidRB) return res.json({ status: 400, message: 'Invalid field!' })

    try {
        const address = new AddressModel({ ...req.body, userId: req.cred.user._id })
        const data = await address.save()
        res.json({ status: 200, data, message: 'Address added.' })

    } catch (e) { next(e) }

}

// get an address /api/addr/get:addressId:get
export const getAddressCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.addressId

    try {
        let address
        if (req.cred.user.role <= ROLES.Seller) address = await AddressModel.findById(_id).populate({
            path: 'country provState city',
            select: 'name'
        })
        else address = await AddressModel.findOne({ _id, userId: req.cred.user._id })
        if (!address) return res.status(404).json({ status: 404, message: `This address id:${_id} not found!` })
        res.json({ status: 200, data: address, message: 'Address found.' })

    } catch (e) { next(e) }

}

// get an address /api/addr/list
export const lisAddressCtr: RequestHandler = async (req, res, next) => {

    try {
        const addresses = await AddressModel.find({ userId: req.cred.user._id }).select('address')
        if (!addresses.length) return res.status(404).json({ status: 404, message: `No addresses found!` })
        res.json({ status: 200, data: addresses, message: 'Address found.' })

    } catch (e) { next(e) }

}

// edit an address /api/addr/edit:addressId:patch
export const ediAddressCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.addressId
    const isValidRB = isValidReq(req.body, ['country', 'provState', 'city', 'street', 'postalcode'])
    if (!isValidRB) return res.json({ status: 400, message: 'Invalid field!' })

    try {
        let address: any
        if (req.cred.user.role <= ROLES.Seller) address = await AddressModel.findById(_id)
        else address = await AddressModel.findOne({ _id, userId: req.cred.user._id })
        Object.keys(req.body).forEach(item => address[item] = req.body[item])
        const data = await address.save()
        res.json({status: 200, data, message: 'Address updated.'})
    } catch (e) { next(e) }

}

// remove an address /api/addr/remove:addressId:delete
export const remAddressCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.addressId

    try {

        const address = await AddressModel.findByIdAndDelete(_id)
        if (!address) return res.status(404).json({ status: 404, message: `This address id: ${_id} not found!` })
        res.json({ status: 200, data: address, message: 'Address deleted.' })

    } catch (e) { next(e) }

}