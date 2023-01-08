import { Router } from "express";
import { Auth } from "../middlewares/auth.js";
import { Role, ROLES, Access } from "../middlewares/role.js";

const router = Router()

import {

    addProdCtr,
    deleteProdCtr,
    updateProdCtr,
    getProdCtr,
    listProdCtr

} from "../controllers/product.js"


router.route('/add').post(Auth, Role(ROLES.Seller, Access.Higher), addProdCtr)
router.route('/delete/:productId').delete(Auth, deleteProdCtr)
router.route('/update/:productId').patch(Auth, updateProdCtr)
router.route('/get/:productId').get(getProdCtr)
router.route('/list').get(listProdCtr)

export default router