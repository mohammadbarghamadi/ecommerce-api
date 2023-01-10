import { RequestHandler } from "express";
import UserModel from "../db/models/user.model.js";
import jwt from "jsonwebtoken";

interface JWTInt {
    _id: string
    iat: number
    exp: number
}

export const NoAuth: RequestHandler = async (req, res, next) => {
    try {
        req.cred.isAuthenticated = false
        const token: string = req.cookies.authToken
        if (!token) throw new Error
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JWTInt
        const user = await UserModel.findOne({ _id: decoded, 'tokens.token': token })
        if (!user) throw new Error
        req.cred = {user: user, token: token, isAuthenticated: true}
        next()
    } catch (e) {
        next()
    }
}

export const Auth: RequestHandler = async (req, res, next) => {

    try {
        const token: string = req.cookies.authToken
        if (!token) return res.status(401).json({ message: 'Please authenticate!' })
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as JWTInt
        const user = await UserModel.findOne({ _id: decoded, 'tokens.token': token })
        if (!user) return res.status(401).json({ message: 'Please authenticate!' })
        req.cred = {user: user, token: token, isAuthenticated: true}
        next()
    } catch (e) {
        res.status(401).json({ message: 'Please authenticate!' })

    }
}

