import mongoose from "mongoose";


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
    },
    replayTo: {
        type: mongoose.Schema.Types.ObjectId,
    },
    rating: {
        type: Number
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { timestamps: true })

commentSchema.index({ name: 'text', email: 'text', title: 'text' })

const CommentModel = mongoose.model('comments', commentSchema)

export default CommentModel