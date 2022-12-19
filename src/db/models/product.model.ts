import mongoose from "mongoose";


const productSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String
    },
    images: {
        main: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'images'
        },
        gallery: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'images'
        }
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    },
    tag: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tags'
    },
    meta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'meta'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    comments: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'comments'
    }

}, {
    timestamps: true
})

const ProductModel = mongoose.model('products', productSchema)

export default ProductModel