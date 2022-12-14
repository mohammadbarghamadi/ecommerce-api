import mongoose from "mongoose";


const orderSchema = new mongoose.Schema({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    list: [{
        prodId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'products',
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

const OrderModel = mongoose.model('carts',orderSchema)

export default OrderModel