import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    list: [{
        prodId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        count: {
            type: Number,
            required: true,
            default: 1
        },
        title: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    price: {
        type: Number,
        required: true
    }

})

const CartModel = mongoose.model('carts',cartSchema)

export default cartSchema