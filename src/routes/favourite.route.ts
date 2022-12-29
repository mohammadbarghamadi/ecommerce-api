import { Router } from "express";
import { Auth } from "../middlewares/auth.js";


const router = Router()

import {
    addFavoCtr,
    clsFavoCtr,
    lisFavoCtr
} from '../controllers/favourite.js'


router.route('/list').get(Auth, lisFavoCtr)
router.route('/add').post(Auth, addFavoCtr)
router.route('/clear').delete(Auth, clsFavoCtr)


export default router