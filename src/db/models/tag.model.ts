import mongoose from "mongoose"


const tagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    meta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'meta'
    }
})

const TagsModel = mongoose.model('tags',tagSchema)

export default TagsModel