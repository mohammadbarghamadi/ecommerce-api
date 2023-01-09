import { Router } from "express";

import { Auth } from "../middlewares/auth.js";
import { ROLES, Role, Access } from "../middlewares/role.js";

const router = Router()

import {
    addTagCtr,
    ediTagCtr,
    getTagCtr,
    delTagCtr,
    LisTagCtr
} from '../controllers/tag.js'


router.route('/get/:tagId').get(getTagCtr)
router.route('/list').get(LisTagCtr)
router.route('/add').post(Auth, Role(ROLES.Admin, Access.Higher), addTagCtr)
router.route('/edit/:tagId').patch(Auth, Role(ROLES.Admin, Access.Higher), ediTagCtr)
router.route('/delete/:tagId').delete(Auth, Role(ROLES.Admin, Access.Higher), delTagCtr)

export default router