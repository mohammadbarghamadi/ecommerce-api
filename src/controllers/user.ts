import { RequestHandler } from "express-serve-static-core";
import UserModel, { UserInt } from "../db/models/user.model.js";
import { queryHandler } from "../utils/filter.js";
import resetPassTemp from "../templates/emails/forgot.js";
import sendEmail from "../utils/nodemailer.js";

// user signup controller /api/user/signup
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

// user signin controller /api/user/signin 
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

// user singout controller /api/user/signout
export const userSignoutCtr: RequestHandler = async (req, res, next) => {

    try {
        req.user!.tokens = req.user?.tokens?.filter(item => item.token !== req.token)
        await req.user!.save()
        res.json({ status: 200, message: 'signout with success!' })
    } catch (e) {
        next(e)
    }

}

// user singout all controller /api/user/signoutall
export const userSignoutAllCtr: RequestHandler = async (req, res, next) => {

    try {
        req.user!.tokens = req.user?.tokens?.filter(item => item.token === req.token)
        await req.user!.save()
        res.json({ status: 200, message: 'Signed out from all devices!' })
    } catch (e) {
        next(e)
    }

}

// user profile controller /api/user/profile
export const userProfiletr: RequestHandler = async (req, res, next) => {

    try {
        res.json({ status: 200, data: req.user, message: 'User profile' })
    } catch (e) {
        next(e)
    }

}

// user update controller /api/user/update
export const userUpdateCtr: RequestHandler = async (req, res, next) => {

    const element = Object.keys(req.body)
    const allowed = ['name', 'email', 'address', 'phone', 'password']
    const isMatch = element.every(item => allowed.includes(item))

    if (!isMatch) return next({ code: 400, message: 'Invalid fields!' })

    try {
        const user: any = req.user
        element.forEach(item => user[item] = req.body[item])
        const update = await user.save()
        res.json({ status: 200, data: update, message: 'User updated!' })
    } catch (e) {
        next(e)
    }

}

// user forgot password controller /api/user/forgot
export const userForgetCtr: RequestHandler = async (req, res, next) => {

    if (!req.body.email) return next({ code: 400, message: 'Provide username or email address' })
    const { email } = req.body
    try {
        const user = await UserModel.findOne({ email })
        if (!user) return next({ code: 404, message: 'No user found!' })

        const token = await user.genResetToken()
        const template = resetPassTemp(token)
        const options = { to: email, subject: 'Reset Password', html: template }
        const message = await sendEmail(options)
        res.json({ status: 200, message })

    } catch (e) {
        next(e)
    }

}

// user password reset controller /api/user/reset
export const userResetCtr: RequestHandler = async (req, res, next) => {

    const token = req.params.resetToken
    const { password } = req.body

    if (!token || !password) return next({ code: 400, message: 'Bad request!' })
    try {
        const user = await UserModel.resetPassword(token, password)
        if (!user) return next({ code: 401, message: 'Invalid request!' })
        res.json({ status: 200, message: 'Your password has been changed!' })
    } catch (e) {
        next(e)
    }

}

// user delete controller /api/user/delete
export const userDeleteCtr: RequestHandler = async (req, res, next) => {

    try {
        const user = req.user?.delete()
        if (!user) return next({ code: 404, message: 'User not found!' })
        res.json({ status: 200, message: 'Your account has been removed!', data: user })
    } catch (e) {
        next(e)
    }

}

// get user list by admins /api/user/list
export const userListCtr: RequestHandler = async (req, res, next) => {
    const { createdAt, updatedAt, limit, skip } = queryHandler(req.query)
    try {
        const users = await UserModel.find().limit(limit).skip(skip).sort(createdAt).sort(updatedAt)
        res.json({ status: 200, data: users })
    } catch (e) {
        next(e)
    }
}

// search between users by admins /api/user/search
export const userSearchCtr: RequestHandler = async (req, res, next) => {
    const { createdAt, updatedAt, limit, skip, keyphrase } = queryHandler(req.query)
    try {
        const users = await UserModel.find({ $text: { $search: keyphrase, $caseSensitive: false } })
            .limit(limit).skip(skip).sort(createdAt).sort(updatedAt)
        res.json({ status: 200, data: users })
    } catch (e) {
        next(e)
    }
}


// create user by admins /api/user/create
export const userCreateCtr: RequestHandler = async (req, res, next) => {



}

// edit users by admins /api/user/edit/:userId
export const userEditCtr: RequestHandler = async (req, res, next) => {
    const element = Object.keys(req.body)
    const allowed = ['name', 'email', 'address', 'phone', 'password', 'role']
    const isMatch = element.every(item => allowed.includes(item))
    if (!isMatch) return next({ code: 400, message: 'Invalid fields!' })

    try {
        const user: any = await UserModel.findById(req.params.userId)
        if (!user) return next({ code: 404, message: 'User not found!' })

        if (req.user?.role !== 1000)
            if (req.body.role && req.user?.role! >= user.role)
                return next({ code: 403, message: `You have insufficient permission!` })

        element.forEach(item => user[item] = req.body[item])
        const update = await user.save()
        res.json({ status: 200, data: update, message: 'User updated!' })
    } catch (e) {
        next(e)
    }

}

// remove users by admins /api/user/remove/:userId
export const userRemoveCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.userId
    if (!_id) return next({ code: 400, message: 'Bad request' })

    try {
        const user = await UserModel.findOneAndDelete({ _id })
        if (!user) return next({ code: 404, message: 'No user found!' })

        if (req.user?.role !== 1000)
            if (req.user?.role! >= user.role)
                return next({ code: 403, message: `You have insufficient permission!` })

        res.json({ status: 200, data: user, message: 'User has been removed!' })
    } catch (e) {
        next(e)
    }

}