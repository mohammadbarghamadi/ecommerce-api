import mongoose from "mongoose";


export interface CartSchemaInt {
    userId: mongoose.Types.ObjectId
    list: {
        prodId: mongoose.Types.ObjectId
        quantity: number
        price: number
    }[],
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
    let amount = 0
    this.list.forEach(item => amount += item.price * item.quantity)
    this.amount = amount
})

const CartModel = mongoose.model('carts', cartSchema)

export default CartModel