import { RequestHandler } from "express-serve-static-core";
import UserModel from "../db/models/user.model.js";


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
        if (user.error) return next({ message: 'Invalid Credentials!', code: 401})
        const token = await user.genAuthToken()
        res.json({status: 200, data: {user, token}, message: 'User signed in.'})
    } catch (e) {
        next(e)
    }
}

export const userSignoutCtr: RequestHandler = async (req, res) => {



}

export const userSignoutAllCtr: RequestHandler = async (req, res) => {



}

export const userProfiletr: RequestHandler = async (req, res) => {



}

export const userListCtr: RequestHandler = async (req, res) => {



}

export const userUpdateCtr: RequestHandler = async (req, res) => {



}

export const userForgetCtr: RequestHandler = async (req, res) => {



}

export const userResetCtr: RequestHandler = async (req, res) => {



}

export const userDeleteCtr: RequestHandler = async (req, res) => {



}