import { Router } from "express";
import { Auth } from "../middlewares/auth.js";

const router = Router()

import {

    addCartCtr,
    delCartCtr,
    updCartCtr,
    viwCartCtr

} from '../controllers/cart.js'

router.route('/add').post(Auth, addCartCtr)
router.route('/delete').delete(Auth, delCartCtr)
router.route('/update').patch(Auth, updCartCtr)
router.route('/view').get(Auth, viwCartCtr)


export default router