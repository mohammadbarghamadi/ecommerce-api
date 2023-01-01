import mongoose, { Types, Document, Model } from "mongoose"

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
        unique: true,
        lowercase: true
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
        ref: 'meta'
    }
})

const CategoryModel = mongoose.model('categories', categorySchema)

export default CategoryModel