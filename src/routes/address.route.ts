import { Router } from "express";
import { Auth } from "../middlewares/auth.js";


const router = Router()

import {

    addAddressCtr,
    remAddressCtr,
    ediAddressCtr,
    getAddressCtr

} from '../controllers/address.js'


router.route('/get').get(Auth, getAddressCtr)
router.route('/add').post(Auth, addAddressCtr)
router.route('/edit').patch(Auth, ediAddressCtr)
router.route('/remove').post(Auth, remAddressCtr)


export default router