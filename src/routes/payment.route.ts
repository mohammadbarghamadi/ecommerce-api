import { Router } from "express";
import { Auth } from "../middlewares/auth.js";

const router = Router()


import {
    PayRequestCtr
} from '../controllers/payment.js'

router.route('/payment').post(Auth, PayRequestCtr)

export default router