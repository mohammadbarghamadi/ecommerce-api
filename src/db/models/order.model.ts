import mongoose, { Types } from "mongoose";
import { PaymentState } from "../../types/types.js";


interface OrderSchemaInt {
    userId: Types.ObjectId,
    list: {
        prodId: Types.ObjectId
        quantity: number
        price: number
    }[]
    payment: {
        authority: string
        code: number
        state: PaymentState
        date: Date
    }
    state: PaymentState
    amount: number
}

const orderSchema = new mongoose.Schema<OrderSchemaInt>({

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
            default: 1
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
        }
    },
    amount: {
        type: Number,
        required: true,
        default: 0
    }

})

const OrderModel = mongoose.model('orders', orderSchema)

export default OrderModel