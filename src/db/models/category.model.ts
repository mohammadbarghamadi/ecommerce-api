import mongoose, { Types, Document, Model } from "mongoose"
import { isValidURL } from "../../config/regex.js"

interface CategoryInt {
    name: string
    url: string
    category: Types.ObjectId
    children: Types.ObjectId[]
    meta: Types.ObjectId
}


interface CategorySchemaInt extends Document, CategoryInt { }

const categorySchema = new mongoose.Schema<CategorySchemaInt>({
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true,
        match: [isValidURL, 'Enter a valid URL(a-z A-Z 0-9 -)'],
        unique: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    children: [{
        type: mongoose.Schema.Types.ObjectId
    }],
    meta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'metas'
    }
})

const CategoryModel = mongoose.model('categories', categorySchema)

export default CategoryModel