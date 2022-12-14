import mongoose from "mongoose"


const tagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    meta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'meta'
    }
})

const TagsModel = mongoose.model('tags',tagsSchema)

export default TagsModel