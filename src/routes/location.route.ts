import { Router } from "express";
import { Auth } from "../middlewares/auth.js";
import { Role, ROLES } from "../middlewares/role.js";

const router = Router()


import {

    countryListCtr,
    addLocationCtr,
    remLocationCtr,
    ediLocationCtr,
    getLocationCtr

} from '../controllers/location.js'

router.route('/list').get(countryListCtr)
router.route('/get/:locationId').get(getLocationCtr)
router.route('/add').post(Auth, Role(ROLES.Admin), addLocationCtr)
router.route('/edit/:locationId').patch(Auth, Role(ROLES.Admin), ediLocationCtr)
router.route('/remove/:locationId').delete(Auth, Role(ROLES.Admin), remLocationCtr)



export default router