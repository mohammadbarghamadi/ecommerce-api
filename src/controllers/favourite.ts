import { RequestHandler } from "express";
import FavoModel from "../db/models/favourite.model.js";


// add product to favorite list /api/favo/add:post
export const addFavoCtr: RequestHandler = async (req, res, next) => {

    const { prodId } = req.body
    let favorite
    let message = 'Item added to favorites.'
    try {
        const favoList = await FavoModel.findOne({ userId: req.cred.user._id })

        if (!favoList) {
            const newFavo = new FavoModel({ userId: req.cred.user._id, list: [{ prodId }] })
            favorite = await newFavo.save() // need fix / doesn't return any message to favorite var
        } else if (favoList) {
            let prodIdFound = false
            favoList.list.find(item => item.prodId.equals(prodId) ? prodIdFound = true : false)
            if (!prodIdFound) favoList.list.push({ prodId })
            else favoList.list = favoList.list.filter(item => !item.prodId.equals(prodId))
            { prodIdFound ? message = 'Item removed from favorites.' : message }
        }

        favorite = await favoList?.save()

        res.json({ status: 200, data: favorite, message })
    } catch (e) {
        next(e)
    }

}

// clear favorite list /api/favo/clear:delete
export const clsFavoCtr: RequestHandler = async (req, res, next) => {

    try {
        const favoList = await FavoModel.findOne({ userId: req.cred.user._id })
        if (!favoList) return next({ code: 404, message: 'No favorite list was found!' })
        favoList.list = []
        const favorite = await favoList.save()
        res.json({ status: 200, data: favorite, message: 'Favorite list emptied' })
    } catch (e) {
        next(e)
    }

}

// get favorites list /api/favo/list:get
export const lisFavoCtr: RequestHandler = async (req, res, next) => {

    try {
        const favoList = await FavoModel.findOne({ userId: req.cred.user._id }).populate({
            path: 'list.prodId',
            select: 'title price url images.main'
        })
        if (!favoList) return next({ code: 404, message: 'list found!' })
        res.json({ status: 200, data: favoList, message: 'Favorite list' })
    } catch (e) {
        next(e)
    }

}