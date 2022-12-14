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
    }

}, {
    timestamps: true
})

const ProductModel = mongoose.model('products', productSchema)