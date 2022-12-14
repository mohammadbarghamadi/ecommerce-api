import mongoose from "mongoose";


export interface CartSchemaInt {
    userId: mongoose.Types.ObjectId
    list: {
        prodId: mongoose.Types.ObjectId
        quantity: Number
        title: String
        price: Number
    },
    amount: Number
}

const cartSchema = new mongoose.Schema<CartSchemaInt>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    list: [{
        prodId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        quantity: {
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
    amount: {
        type: Number,
        required: true
    },
    

})

const CartModel = mongoose.model('carts',cartSchema)

export default cartSchema