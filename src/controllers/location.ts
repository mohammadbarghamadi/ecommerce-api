import { RequestHandler } from "express";
import { CountryModel, CityModel, ProvStateModel } from "../db/models/address.model.js";
import { LocationType } from "../types/types.js";
import { isValidReq } from "../utils/validate.js";

export const countryListCtr: RequestHandler = async (req, res, next) => {

    try {
        const countires = await CountryModel.find({})
        if (!countires) return res.status(404).json({ status: 404, message: 'No country found!' })
        res.json({ status: 200, data: countires, message: 'Country found.' })
    } catch (e) { next(e) }

}

// get country,state/province,city /api/loca/get:localtionId:get
export const getLocationCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.locationId

    try {
        if (req.body.type === LocationType.Country) {

            const country = await CountryModel.findById(_id)
            if (!country) return res.status(404).json({ status: 404, message: `This country id: ${_id} not found!` })
            const provState = await ProvStateModel.find({ parent: _id })
            res.json({ status: 200, data: { country, provState }, message: 'Country found' })

        } else if (req.body.type === LocationType.ProvState) {

            const provState = await ProvStateModel.findById(_id)
            const city = await CityModel.find({ parent: _id })
            if (!provState) return res.status(404).json({ status: 404, message: `This State/Province id: ${_id} not found!` })
            res.json({ status: 200, data: { provState, city }, message: 'Province/State found!' })

        } else if (req.body.type === LocationType.City) {

            const city = await CityModel.findById(_id)
            if (!city) return res.status(404).json({ status: 404, message: `This City id: ${_id} not found!` })
            res.json({ status: 200, data: city, message: 'City found' })

        } else {
            res.status(400).json({ status: 400, message: 'Invalid request!' })
        }

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
        let location: any
        if (req.body.type === LocationType.Country) location = new CountryModel(req.body)
        else if (req.body.type === LocationType.ProvState) location = new ProvStateModel(req.body)
        else if (req.body.type === LocationType.City) location = new CityModel(req.body)
        else return res.status(400).json({ status: 400, message: 'Type not defined!' })
        const data = await location.save()
        res.json({ status: 200, data, message: 'Location added.' })
    } catch (e) { next(e) }

}

// edit country,state/province,city /api/loca/edit:localtionId:patch
export const ediLocationCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.localtionId

    const isValidRB = isValidReq(req.body, ['name', 'url', 'parent', 'type'])
    if (!isValidRB) return res.status(400).json({ status: 400, message: 'Invalid field!' })
    if (req.body.type === LocationType.ProvState || req.body.type === LocationType.City)
        if (!req.body.parent)
            return res.status(400).json({ status: 400, message: 'Parent field is required.' })

    try {
        let location: any
        if (req.body.type === LocationType.Country) location = await CountryModel.findById(_id)
        else if (req.body.type === LocationType.ProvState) location = await ProvStateModel.findById(_id)
        else if (req.body.type === LocationType.City) location = await CountryModel.findById(_id)
        else return res.status(400).json({ status: 400, message: 'Invalid request!' })

        if (!location) return res.status(404).json({ status: 404, message: `This location id: ${_id} not found!` })
        Object.keys(req.body).forEach(item => location[item] = req.body[item])
        const data = await location.save()
        res.json({ status: 200, data, message: 'Location updated.' })

    } catch (e) { next(e) }

}

// remove country,state/province,city /api/loca/remove:localtionId:delete
export const remLocationCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.localtionId

    try {
        let location: any
        if (req.body.type === LocationType.Country) location = await CountryModel.findByIdAndDelete(_id)
        else if (req.body.type === LocationType.ProvState) location = await ProvStateModel.findByIdAndDelete(_id)
        else if (req.body.type === LocationType.City) location = await CountryModel.findByIdAndDelete(_id)
        else return res.status(400).json({ status: 400, message: 'Invalid request!' })
        if (!location) return res.status(404).json({ status: 404, message: `This location id: ${_id} not found!` })
        res.json({ status: 200, data: location, message: `This location id: ${_id} deleted!` })
    } catch (e) { next(e) }

}