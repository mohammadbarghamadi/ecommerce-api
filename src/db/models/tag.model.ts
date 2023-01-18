import mongoose from "mongoose"
import { isValidURL } from "../../config/regex.js"

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
        match: [isValidURL, 'Enter a valid URL(a-z A-Z 0-9 -)'],

    },
    meta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'metas'
    }
})

const TagsModel = mongoose.model('tags',tagSchema)

export default TagsModel