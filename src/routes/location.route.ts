import { Router } from "express";
import { Auth } from "../middlewares/auth";
import { Role, ROLES } from "../middlewares/role";

const router = Router()


import {

    addLocationCtr,
    remLocationCtr,
    ediLocationCtr,
    getLocationCtr

} from '../controllers/location.js'


router.route('/get').get(getLocationCtr)
router.route('/add').post(Auth, Role(ROLES.Admin), addLocationCtr)
router.route('/edit').post(Auth, Role(ROLES.Admin), ediLocationCtr)
router.route('/remove').delete(Auth, Role(ROLES.Admin), remLocationCtr)



export default router