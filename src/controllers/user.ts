import { RequestHandler } from "express-serve-static-core";
import UserModel from "../db/models/user.model.js";
import { queryHandler } from "../utils/filter.js";
import resetPassTemp from "../templates/emails/forgot.js";
import sendEmail from "../utils/nodemailer.js";
import { ROLES } from "../middlewares/role.js";
import { isValidReq } from "../utils/validate.js";

// user signup controller /api/user/signup:post
export const userSignupCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['name', 'username', 'email', 'address', 'phone', 'password'])
    if (!isValidRB) return next({ message: 'Invalid field', code: 400 })

    try {
        const newUser = new UserModel(req.body)
        const savedUser = await newUser.save()
        res.status(200).json({ status: 200, data: savedUser, message: 'New user created!' })
    } catch (e: any) {
        next(e)
    }
}

// user signin controller /api/user/signin:post
export const userSigninCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['phone', 'email', 'password'])
    if (!isValidRB) return next({ message: 'Invalid field', code: 400 })
    const { email, phone, password } = req.body

    try {
        const user = await UserModel.findByCredentials(email, phone, password)
        if (user.error) return next({ message: 'Invalid Credentials!', code: 401 })
        const token = await user.genAuthToken()
        res.cookie('authToken', token, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        res.json({ status: 200, data: user, message: 'User signed in.' })
    } catch (e) {
        next(e)
    }
}

// user singout controller /api/user/signout:post
export const userSignoutCtr: RequestHandler = async (req, res, next) => {

    try {
        req.cred.user.tokens = req.cred.user.tokens?.filter(item => item.token !== req.cred.token)
        await req.cred.user!.save()
        res.json({ status: 200, message: 'signout with success!' })
    } catch (e) {
        next(e)
    }

}

// user singout all controller /api/user/signoutall:post
export const userSignoutAllCtr: RequestHandler = async (req, res, next) => {

    try {
        req.cred.user.tokens = req.cred.user.tokens?.filter(item => item.token === req.cred.token)
        await req.cred.user!.save()
        res.json({ status: 200, message: 'Signed out from all devices!' })
    } catch (e) {
        next(e)
    }

}

// user profile controller /api/user/profile:get
export const userProfiletr: RequestHandler = async (req, res, next) => {

    try {
        res.json({ status: 200, data: req.cred.user, message: 'User profile' })
    } catch (e) {
        next(e)
    }

}

// user update controller /api/user/update:patch
export const userUpdateCtr: RequestHandler = async (req, res, next) => {

    const element = Object.keys(req.body)
    const isValidRB = isValidReq(req.body, ['name', 'email', 'address', 'phone', 'password'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid fields!' })

    try {
        const user: any = req.cred.user
        element.forEach(item => user[item] = req.body[item])
        const update = await user.save()
        res.json({ status: 200, data: update, message: 'User updated!' })
    } catch (e) {
        next(e)
    }

}

// user forgot password controller /api/user/forgot:post
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

// user password reset controller /api/user/reset:get
export const userResetCtr: RequestHandler = async (req, res, next) => {

    const token = req.params.resetToken
    const { password } = req.body

    if (!token || !password) return next({ code: 400, message: 'Bad request!' })
    try {
        const user = await UserModel.resetPassword(token, password)
        if (!user) return next({ code: 401, message: 'Invalid request!' })
        res.json({ status: 200, message: 'Your password changed!' })
    } catch (e) {
        next(e)
    }

}

// user delete controller /api/user/delete:delete
export const userDeleteCtr: RequestHandler = async (req, res, next) => {

    try {
        const user = req.cred.user.delete()
        if (!user) return next({ code: 404, message: 'User not found!' })
        res.json({ status: 200, message: 'Your account removed!', data: user })
    } catch (e) {
        next(e)
    }

}

// get user list by admins /api/user/list:get
export const userListCtr: RequestHandler = async (req, res, next) => {
    const { createdAt, updatedAt, limit, skip } = queryHandler(req.query)
    try {
        const users = await UserModel.find().limit(limit).skip(skip).sort({createdAt})
        res.json({ status: 200, data: users })
    } catch (e) {
        next(e)
    }
}

// search between users by admins /api/user/search:get
export const userSearchCtr: RequestHandler = async (req, res, next) => {
    const { createdAt, updatedAt, limit, skip, keyphrase } = queryHandler(req.query)
    try {
        const users = await UserModel.find({ $text: { $search: keyphrase, $caseSensitive: false } })
            .limit(limit).skip(skip).sort({createdAt})
        res.json({ status: 200, data: users })
    } catch (e) {
        next(e)
    }
}


// create user by admins /api/user/create:post
export const userCreateCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['name', 'username', 'email', 'address', 'phone', 'password', 'role'])
    if (!isValidRB) return next({ message: 'Invalid field', code: 400 })

    if (req.cred.user.role !== ROLES.Root)
        if (req.cred.user.role! >= req.body.role)
            return next({ code: 403, message: `You have insufficient permission!` })

    try {
        const newUser = new UserModel(req.body)
        const savedUser = await newUser.save()
        res.status(200).json({ status: 200, data: savedUser, message: 'New user created!' })
    } catch (e: any) {
        next(e)
    }

}

// edit users by admins /api/user/edit/:userId:patch
export const userEditCtr: RequestHandler = async (req, res, next) => {

    const element = Object.keys(req.body)
    const isValidRB = isValidReq(req.body, ['name', 'email', 'address', 'phone', 'password', 'role'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid fields!' })

    try {
        const user: any = await UserModel.findById(req.params.userId)
        if (!user) return next({ code: 404, message: 'User not found!' })

        if (req.cred.user.role !== ROLES.Root)
            if (req.cred.user.role! >= user.role)
                return next({ code: 403, message: `You have insufficient permission!` })

        element.forEach(item => user[item] = req.body[item])
        const update = await user.save()
        res.json({ status: 200, data: update, message: 'User updated!' })
    } catch (e) {
        next(e)
    }

}

// remove users by admins /api/user/remove/:userId:delete
export const userRemoveCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.userId
    if (!_id) return next({ code: 400, message: 'Bad request' })

    try {
        const user = await UserModel.findOne({ _id })
        if (!user) return next({ code: 404, message: 'No user found!' })

        if (req.cred.user.role !== ROLES.Root)
            if (req.cred.user.role! >= user.role)
                return next({ code: 403, message: `You have insufficient permission!` })

        await user.remove()

        res.json({ status: 200, data: user, message: 'User removed!' })
    } catch (e) {
        next(e)
    }

}