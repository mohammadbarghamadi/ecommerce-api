import { Router } from "express";
import { Auth } from "../middlewares/auth.js";
import { Role, ROLES, Access } from "../middlewares/role.js";

const router = Router()

import {

    addProdCtr,
    deleteProdCtr,
    updateProdCtr,
    viewProdCtr,
    listProdCtr

} from "../controllers/product.js"


router.route('/add').post(Auth, Role(ROLES.Seller, Access.Higher), addProdCtr)
router.route('/delete').delete(Auth, deleteProdCtr)
router.route('/update').patch(Auth, updateProdCtr)
router.route('/view').get(Auth, viewProdCtr)
router.route('/list').get(Auth, listProdCtr)


export default router