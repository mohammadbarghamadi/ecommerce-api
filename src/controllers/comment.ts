import { RequestHandler } from "express";
import CommentModel from "../db/models/comment.model.js";
import { ROLES } from "../middlewares/role.js";
import { CommentStatus } from "../types/types.js";
import { queryHandler } from "../utils/filter.js";
import { isValidReq } from "../utils/validate.js";


// view a single comment /api/cmnt/view/:commentId:get
export const viwCommentCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.commentId

    try {
        const comment = await CommentModel.findById(_id)
        if (!comment) return res.status(404).json({ status: 404, message: 'No comment found!' })
        res.json({ status: 200, data: comment, message: 'comment found.' })
    } catch (e) { next(e) }

}

// list comments /api/cmnt/list:get
export const lisCommentCtr: RequestHandler = async (req, res, next) => {

    const { createdAt, limit, skip, keyphrase } = queryHandler(req.query)

    try {
        let comments
        if (req.cred.user.role! <= ROLES.Seller && req.body.admin === true) comments = await CommentModel.find({}).limit(limit).skip(skip).sort({ createdAt })
        else comments = await CommentModel.find({ authorId: req.cred.user._id }).limit(limit).skip(skip).sort({ createdAt })
        if (!comments.length) return res.status(404).json({ status: 404, message: 'No comment found!' })
        res.json({ status: 200, data: comments, message: 'Comments found.' })
    } catch (e) { next(e) }

}

// show comment /api/cmnt/show:commentId:get
export const shwCommentCtr: RequestHandler = async (req, res, next) => {

    const { limit, skip } = queryHandler(req.query)
    const _id = req.params.prodId
    if (!_id) return res.status(400).json({ status: 400, message: 'Bad request sent!' })

    try {
        const comments = await CommentModel.find({ prodId: _id, status: CommentStatus.Approved }).select('name email replayTo title description rating').limit(limit).skip(skip)
        if (!comments.length) return res.status(404).json({ status: 404, message: 'No comment found!' })
        res.json({ status: 200, data: comments, message: 'Product comments found.' })
    } catch (e) { next(e) }

}

// add a comment /api/cmnt/add:post
export const addCommentCtr: RequestHandler = async (req, res, next) => {

    const isValidRB = isValidReq(req.body, ['name', 'email', 'replayTo', 'prodId', 'authorId', 'rating', 'title', 'description'])
    if (!isValidRB) return res.status(400).json({ status: 400, message: 'Invalid field!' })

    try {
        let newComment
        if (req.cred.isAuthenticated && req.cred.user) newComment = new CommentModel({ ...req.body, name: req.cred.user.name, email: req.cred.user.email, authorId: req.cred.user._id })
        else newComment = new CommentModel(req.body)
        const comment = await newComment.save()
        res.json({ status: 200, data: comment, message: 'New comment added.' })

    } catch (e) { next(e) }

}

// edit a comment /api/cmnt/edit/:commentId:patch
export const ediCommentCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.commentId
    const isValidRB = isValidReq(req.body, ['name', 'email', 'prodId', 'replayTo', 'rating', 'title', 'description', 'status'])
    if (!isValidRB) return res.json({ status: 400, message: 'Invalid field!' })

    try {
        const comment: any = await CommentModel.findById(_id)
        if (!comment) return res.json({ status: 404, message: 'Comment not found.' })
        Object.keys(req.body).forEach(item => comment[item] = req.body[item])
        const data = await comment.save()
        res.json({ status: 200, data, message: 'Comment updated.' })
    } catch (e) { next(e) }

}

// delete a comment /api/cmnt/delete/:commentId:delete
export const delCommentCtr: RequestHandler = async (req, res, next) => {

    const _id = req.params.commentId

    try {
        const comment = await CommentModel.findByIdAndDelete(_id)
        if (!comment) return res.status(404).json({ status: 404, message: 'Comment not found!.' })
        res.json({ status: 200, data: comment, message: 'Comment deleted.' })
    } catch (e) { next(e) }

}