import { ZarinGatewayReqInt, PaymentOptionsInt } from "../types/types.js"
import axios from "axios"

type ZarinGatewayReq = (payment: PaymentOptionsInt) => Promise<{code: number, authority: 'string', message: 'string'}>

// send payment request to zarinpal
export const ZarinGateway: ZarinGatewayReq = async (payment) => {

    let options: ZarinGatewayReqInt = {
        merchant_id: process.env.ZARIN_PAY_MERCHANT!,
        callback_url: process.env.PAYMENT_CALLBACK_URL!,
        amount: payment.amount,
        description: payment.description,
        mobile: payment.mobile,
        email: payment.email
    }

    const response = await axios.post(process.env.ZARIN_PAY_ADDRESS!, options)
    return response.data.data
}