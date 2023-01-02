import { RequestHandler } from "express";
import CommentModel from "../db/models/comment.model";
import { ROLES } from "../middlewares/role";
import { queryHandler } from "../utils/filter";
import { isValidReq } from "../utils/validate";


// view a single comment /api/cmnt/view/:commentId:get
export const viwCommentCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.commentId

    try {
        const comment = await CommentModel.findById(_id)
        if (!comment) return next({ code: 404, message: 'No comment found!' })
        res.json({ status: 200, data: comment, message: 'comment found.' })
    } catch (e) { next(e) }

}

// list comments /api/cmnt/list:get
export const lisCommentCtr: RequestHandler = async (req, res, next) => {
    const { createdAt, limit, skip, keyphrase } = queryHandler(req.query)
    try {
        let comments
        if (req.user?.role! <= ROLES.Seller) comments = await CommentModel.find({ $text: { $search: keyphrase } }).limit(limit).skip(skip).sort({ createdAt })
        else comments = await CommentModel.find({ authorId: req.user?._id }).limit(limit).skip(skip).sort({ createdAt })
        if (!comments) return next({ code: 404, message: 'No comment found!' })
        res.json({ status: 200, data: comments, message: 'Comments found.' })
    } catch (e) { next(e) }

}

// show comment /api/cmnt/list:get
export const shwCommentCtr: RequestHandler = async (req, res, next) => {

    const { limit, skip } = queryHandler(req.query)
    const _id = req.params.prodId

    try {
        const comments = await CommentModel.find({ prodId: _id }).select('name email replayTo title description rating').limit(limit).skip(skip)
        if (!comments) next({ code: 404, message: 'No comment found!' })
        res.json({ status: 200, data: comments, message: 'Product comments found.' })
    } catch (e) { next(e) }

}

// add a comment /api/cmnt/add:post
export const addCommentCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['name', 'email', 'replayTo', 'prodId', 'authorId', 'rating', 'title', 'description'])
    if (!isValidRB) return next({ code: 400, message: 'Invalid field!' })

    try {
        let newComment
        if (req.user) newComment = new CommentModel({ ...req.body, name: req.user?.name, email: req.user?.email, authorId: req.user._id })
        else newComment = new CommentModel(req.body)
        const comment = await newComment.save()
        res.json({ status: 200, data: comment, message: 'New comment added.' })

    } catch (e) { next(e) }

}

// edit a comment /api/cmnt/edit/:commentId:patch
export const ediCommentCtr: RequestHandler = async (req, res, next) => {

}

// delete a comment /api/cmnt/delete/:commentId:delete
export const delCommentCtr: RequestHandler = async (req, res, next) => {

}