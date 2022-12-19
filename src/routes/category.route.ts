import { Router } from "express";

import { Auth } from "../middlewares/auth.js";
import { ROLES, Role, Access } from "../middlewares/role.js";

const router = Router()

import {
    addCategoryCtr,
    ediCategoryCtr,
    viwCategoryCtr,
    delCategoryCtr,
    LisCategoryCtr
} from '../controllers/category.js'


router.route('/add').post(Auth, Role(ROLES.Admin, Access.Higher), addCategoryCtr)
router.route('/edit/:categoryId').patch(Auth, Role(ROLES.Admin, Access.Higher), ediCategoryCtr)
router.route('/view/:categoryId').get(Auth, Role(ROLES.Admin, Access.Higher), viwCategoryCtr)
router.route('/delete/:categoryId').delete(Auth, Role(ROLES.Admin, Access.Higher), delCategoryCtr)
router.route('/list').get(Auth, Role(ROLES.Admin, Access.Higher), LisCategoryCtr)

export default router