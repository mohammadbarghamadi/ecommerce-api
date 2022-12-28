import { Router } from "express";
import { Auth } from "../middlewares/auth.js";

const router = Router()


import {
    CheckoutCtr,
    PayRequestCtr
} from '../controllers/payment.js'

router.route('/payment').post(Auth, PayRequestCtr)
router.route('/checkout').post(Auth, CheckoutCtr)


export default router