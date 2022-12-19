import mongoose from "mongoose";


const imageSchema = new mongoose.Schema({

    image: {
        alt: {String},
        address: {String}
    },
    images: [{
        alt: {String},
        address: {String}
    }],
    usedId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    prodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products'
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'posts'
    }

})

const ImageModel = mongoose.model('images', imageSchema)

export default ImageModel