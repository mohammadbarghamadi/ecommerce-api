import { Router } from "express";
import { Auth } from "../middlewares/auth.js";


const router = Router()

import {

    listOrderCtr,
    getOrderCtr

} from '../controllers/order.js'

router.route('/list').get(Auth, listOrderCtr)
router.route('/get/:orderId').get(Auth, getOrderCtr)


export default router