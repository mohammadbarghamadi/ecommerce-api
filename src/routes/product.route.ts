import { Router } from "express";

const router = Router()

import {

    addProdCtr,
    deleteProdCtr,
    updateProdCtr,
    viewProdCtr,
    listProdCtr

} from "../controllers/product.js"


router.route('/add').post(addProdCtr)
router.route('/delete').delete(deleteProdCtr)
router.route('/update').patch(updateProdCtr)
router.route('/view').get(viewProdCtr)
router.route('/list').get(listProdCtr)


export default router