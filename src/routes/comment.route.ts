import { Router } from "express";
import { Auth } from "../middlewares/auth.js";
import { Role, ROLES, Access } from "../middlewares/role";

const router = Router()

import {
    viwCommentCtr,
    lisCommentCtr,
    shwCommentCtr,
    addCommentCtr,
    ediCommentCtr,
    delCommentCtr
} from '../controllers/comment.js'


router.route('/view').get(viwCommentCtr)
router.route('/show').get(shwCommentCtr)
router.route('/add').post(addCommentCtr)
router.route('/list').get(Auth, Role(ROLES.Customer), lisCommentCtr)
router.route('/edit').patch(Auth, Role(ROLES.Customer), ediCommentCtr)
router.route('/delete').delete(Auth, Role(ROLES.Customer), delCommentCtr)


export default router