import { RequestHandler } from "express";
import { CountryModel, CityModel, ProvStateModel } from "../db/models/address.model.js";
import { LocationType } from "../types/types.js";
import { isValidReq } from "../utils/validate.js";


interface GetLocationInt {
    country?: any
    provState?: any
    city?: any
    message?: string
    status?: boolean
}

// get country,state/province,city /api/loca/get:localtionId:get
export const getLocationCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.locationId // fix required

    try {
        let data: GetLocationInt = { status: true }

        if (req.body.type === LocationType.Country) {

            data = { country: await CountryModel.findById(_id), message: 'Country found' }
            if (!data.country) return data = { message: 'Country not found!', status: false }
            data = { provState: await ProvStateModel.find({ parent: _id }) }

        }
        else if (req.body.type === LocationType.ProvState) {

            data = { provState: await ProvStateModel.findById(_id), message: 'Province/State found!' }
            if (!data.provState) return data = { message: 'Province/State not found!', status: false }
            data = { city: await CityModel.find({ parent: _id }) }

        }
        else if (req.body.type === LocationType.City) {

            data = { city: await CityModel.findById(_id), message: 'City found' }
            if (!data.city) return data = { message: 'City not found!', status: false }

        }
        if (!data.status) res.status(404).json({ status: 404, message: data.message })
        res.json({ status: 200, data, message: data.message })

    } catch (e) { next(e) }

}

// add country,state/province,city /api/loca/add:post
export const addLocationCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['name', 'url', 'parent', 'type'])
    if (!isValidRB) return res.status(400).json({ status: 400, message: 'Invalid field!' })
    if (req.body.type === LocationType.ProvState || req.body.type === LocationType.City)
        if (!req.body.parent)
            return res.status(400).json({ status: 400, message: 'Parent field is required.' })

    try {
        let location
        if (req.body.type === LocationType.Country) location = new CountryModel(req.body)
        else if (req.body.type === LocationType.ProvState) location = new ProvStateModel(req.body)
        else if (req.body.type === LocationType.City) location = new CityModel(req.body)
        else return res.status(400).json({ status: 400, message: 'Type not defined!' })
        const data = await location?.save()
        res.json({ status: 200, data, message: 'Location added.' })
    } catch (e) { next(e) }

}

// edit country,state/province,city /api/loca/edit:localtionId:patch
export const ediLocationCtr: RequestHandler = async (req, res, next) => {


    try {

    } catch (e) { next(e) }

}

// remove country,state/province,city /api/loca/remove:localtionId:delete
export const remLocationCtr: RequestHandler = async (req, res, next) => {

    try {

    } catch (e) { next(e) }

}