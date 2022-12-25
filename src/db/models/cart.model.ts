import mongoose from "mongoose";
import ProductModel from "./product.model";


export interface CartSchemaInt {
    userId: mongoose.Types.ObjectId
    list: [{
        prodId: mongoose.Types.ObjectId
        quantity: number
        price: number
    }],
    amount: number
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
        price: {
            type: Number,
            required: true,
            default: 0
        }
    }],
    amount: {
        type: Number,
        required: true,
        default: 0
    }

})

cartSchema.pre('save', function () {
    let amount = 
    this.list.forEach(item => console.log(item))
})

const CartModel = mongoose.model('carts', cartSchema)

export default CartModel