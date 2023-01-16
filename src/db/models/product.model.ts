import mongoose, { Document, Model, Types } from "mongoose";

interface ProductInt {
    title: string
    excerpt: string
    content: string
    price: number
    url: string
    images: {
        main: Types.ObjectId,
        gallery: Types.ObjectId
    }
    category: Types.ObjectId[]
    tag: Types.ObjectId[]
    meta: Types.ObjectId
    owner: Types.ObjectId
    comments: Types.ObjectId[]
}


const productSchema = new mongoose.Schema<ProductInt>({
    title: {
        type: String,
        trim: true,
        required: true
    },
    excerpt: {
        type: String
    },
    content: {
        type: String
    },
    price: {
        type: Number,
        default: 0,
        required: true
    },
    url: {
        type: String,
        unique: true
    },
    images: {
        main: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'files'
        },
        gallery: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'files'
        }]
    },
    category: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }],
    tag: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tags'
    }],
    meta: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'metas'
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }

}, {
    timestamps: true
})

productSchema.index({
    title: 'text',
    excerpt: 'text',
    content: 'text'
})

productSchema.pre('save', function () {
    if (!this.url) {
        this.url = this.title.toLowerCase().trim().replace(/ /g, '-') + '-' + Math.floor(Math.random() * 99999) + '-' + Date.now()
    }
})

const ProductModel = mongoose.model('products', productSchema)

export default ProductModel