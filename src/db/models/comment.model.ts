import mongoose from "mongoose";


const commentSchema = new mongoose.Schema({
    title: { String },
    rate: { String },
    description: { String }
})

const CommentModel = mongoose.model('comments', commentSchema)

export default CommentModel