import { RequestHandler } from "express-serve-static-core";
import UserModel from "../db/models/user.model.js";
import { queryHandler } from "../utils/filter.js";


export const userSignupCtr: RequestHandler = async (req, res, next) => {

    const element = Object.keys(req.body)
    const allowed = ['name', 'username', 'email', 'address', 'phone', 'password']
    const isMatch = element.every(item => allowed.includes(item))
    if (!isMatch) return next({ message: 'Invalid field', code: 400 })

    try {
        const newUser = new UserModel(req.body)
        const savedUser = await newUser.save()
        res.status(200).json({ status: 200, data: savedUser, message: 'New user created!' })
    } catch (e: any) {
        next(e)
    }
}

export const userSigninCtr: RequestHandler = async (req, res, next) => {

    const element = Object.keys(req.body)
    const allowed = ['phone', 'email', 'password']
    const isMatch = element.every(item => allowed.includes(item))
    if (!isMatch) return next({ message: 'Invalid field', code: 400 })
    const { email, phone, password } = req.body

    try {
        const user = await UserModel.findByCredentials(email, phone, password)
        if (user.error) return next({ message: 'Invalid Credentials!', code: 401 })
        const token = await user.genAuthToken()
        res.cookie('authToken', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 1000 })
        res.json({ status: 200, data: user, message: 'User signed in.' })
    } catch (e) {
        next(e)
    }
}

export const userSignoutCtr: RequestHandler = async (req, res, next) => {

    try {
        req.user!.tokens = req.user?.tokens?.filter(item => item.token !== req.token)
        await req.user!.save()
        res.json({ status: 200, message: 'signout with success!' })
    } catch (e) {
        next(e)
    }

}

export const userSignoutAllCtr: RequestHandler = async (req, res, next) => {

    try {
        req.user!.tokens = req.user?.tokens?.filter(item => item.token === req.token)
        await req.user!.save()
        res.json({ status: 200, message: 'Signed out from all devices!' })
    } catch (e) {
        next(e)
    }

}

export const userProfiletr: RequestHandler = async (req, res, next) => {


    try {
        res.json({ status: 200, data: req.user, message: 'User profile' })
    } catch (e) {
        next(e)
    }

}

export const userListCtr: RequestHandler = async (req, res, next) => {

    const { createdAt, updatedAt, limit, skip } = queryHandler(req.query)
    
    try {
        const users = await UserModel.find().limit(limit).skip(skip).sort(createdAt).sort(updatedAt)
        res.json({ status: 200, data: users })
    } catch (e) {
        next(e)
    }
}

export const userSearchCtr: RequestHandler = async (req, res, next) => {

    const { createdAt, updatedAt, limit, skip, keyphrase } = queryHandler(req.query)
    
    try {
        const users = await UserModel.find({$text: {$search: keyphrase, $caseSensitive: false}})
        .limit(limit).skip(skip).sort(createdAt).sort(updatedAt)
        res.json({ status: 200, data: users })
    } catch (e) {
        next(e)
    }
}

export const userUpdateCtr: RequestHandler = async (req, res, next) => {



}

export const userForgetCtr: RequestHandler = async (req, res, next) => {



}

export const userResetCtr: RequestHandler = async (req, res, next) => {



}

export const userDeleteCtr: RequestHandler = async (req, res, next) => {



}