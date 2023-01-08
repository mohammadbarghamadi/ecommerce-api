import mongoose from "mongoose";
import { PaymentState } from "../../types/types.js";


export interface CartSchemaInt {
    userId: mongoose.Types.ObjectId
    list: {
        prodId: mongoose.Types.ObjectId
        quantity: number
        price: number
    }[]
    payment: {
        authority: string
        code: number
        state: PaymentState
        date: number
    }
    amount: number
}

const cartSchema = new mongoose.Schema<CartSchemaInt>({

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    list: [{
        prodId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            default: 0
        }
    }],
    payment: {
        authority: {
            type: String
        },
        code: {
            type: Number
        },
        state: {
            type: String,
            required: true,
            default: PaymentState.Ready
        },
        date: {
            type: Number,
            required: true,
            default: Date.now()
        }
    },
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