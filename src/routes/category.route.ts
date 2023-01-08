import { Router } from "express";

import { Auth } from "../middlewares/auth.js";
import { ROLES, Role, Access } from "../middlewares/role.js";

const router = Router()

import {
    addCategoryCtr,
    ediCategoryCtr,
    getCategoryCtr,
    delCategoryCtr,
    LisCategoryCtr
} from '../controllers/category.js'


router.route('/get/:categoryId').get(getCategoryCtr)
router.route('/list').get(LisCategoryCtr)
router.route('/add').post(Auth, Role(ROLES.Admin, Access.Higher), addCategoryCtr)
router.route('/edit/:categoryId').patch(Auth, Role(ROLES.Admin, Access.Higher), ediCategoryCtr)
router.route('/delete/:categoryId').delete(Auth, Role(ROLES.Admin, Access.Higher), delCategoryCtr)

export default router