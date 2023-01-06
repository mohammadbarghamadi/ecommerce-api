import { Router } from "express";
import { Auth } from "../middlewares/auth.js";
import { Role, ROLES } from "../middlewares/role.js";

const router = Router()


import {

    addLocationCtr,
    remLocationCtr,
    ediLocationCtr,
    getLocationCtr

} from '../controllers/location.js'


router.route('/get/:locationId').get(getLocationCtr)
router.route('/add').post(Auth, Role(ROLES.Admin), addLocationCtr)
router.route('/edit').post(Auth, Role(ROLES.Admin), ediLocationCtr)
router.route('/remove').delete(Auth, Role(ROLES.Admin), remLocationCtr)



export default router