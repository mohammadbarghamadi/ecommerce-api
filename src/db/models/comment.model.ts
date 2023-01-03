import mongoose from "mongoose";
import { CommentStatus } from "../../types/types.js";


const commentSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    prodId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    replayTo: {
        type: mongoose.Schema.Types.ObjectId,
    },
    rating: {
        type: Number,
        min: [1,'Min number is 1'],
        max: [5, 'max number is 5']
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: CommentStatus.Pending
    }
}, { timestamps: true })

commentSchema.index({ name: 'text', email: 'text', title: 'text' })

const CommentModel = mongoose.model('comments', commentSchema)

export default CommentModel