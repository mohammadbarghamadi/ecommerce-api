import { Router } from "express";
import { Auth } from "../middlewares/auth.js";


const router = Router()

import {

    listOrderCtr,
    viewOrderCtr

} from '../controllers/order.js'

router.route('/list').get(Auth, listOrderCtr)
router.route('/view').get(Auth, viewOrderCtr)


export default router