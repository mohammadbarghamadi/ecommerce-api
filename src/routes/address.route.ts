import { Router } from "express";
import { Auth } from "../middlewares/auth.js";


const router = Router()

import {

    addAddressCtr,
    remAddressCtr,
    ediAddressCtr,
    getAddressCtr,
    lisAddressCtr

} from '../controllers/address.js'


router.route('/add').post(Auth, addAddressCtr)
router.route('/list').get(Auth, lisAddressCtr)
router.route('/get/:addressId').get(Auth, getAddressCtr)
router.route('/edit/:addressId').patch(Auth, ediAddressCtr)
router.route('/delete/:addressId').delete(Auth, remAddressCtr)


export default router