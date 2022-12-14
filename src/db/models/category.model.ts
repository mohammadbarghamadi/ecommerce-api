import mongoose from "mongoose"


const categorySchema = new mongoose.Schema({
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

const CategoryModel = mongoose.model('categories',categorySchema)

export default CategoryModel