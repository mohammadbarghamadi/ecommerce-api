import { RequestHandler } from "express-serve-static-core";
import UserModel from "../db/models/user.model";


export const userSignupCtr: RequestHandler = async (req, res, next) => {

    const element = Object.keys(req.body)
    const allowed = ['name', 'username', 'email', 'address', 'phone', 'password']
    const isMatch = element.every(item => allowed.includes(item))
    if (!isMatch) return next('Invalid field')

    try {
        const newUser = new UserModel(req.body)
        const savedUser = newUser.save()
        res.status(200).json({ status: 200, data: savedUser, message: 'New user created!' })
    } catch (e) {
        next()
    }
}

export const userSigninCtr: RequestHandler = async (req, res) => {

    

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