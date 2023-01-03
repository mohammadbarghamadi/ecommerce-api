import { Router } from "express";
import { Auth, NoAuth } from "../middlewares/auth.js";
import { Role, ROLES, Access } from "../middlewares/role.js";

const router = Router()

import {
    viwCommentCtr,
    lisCommentCtr,
    shwCommentCtr,
    addCommentCtr,
    ediCommentCtr,
    delCommentCtr
} from '../controllers/comment.js'


router.route('/view/:commentId').get(Auth, viwCommentCtr)
router.route('/add').post(NoAuth, addCommentCtr)
router.route('/show/:prodId').get(shwCommentCtr)
router.route('/list').get(Auth, Role(ROLES.Customer), lisCommentCtr)
router.route('/edit/:commentId').patch(Auth, Role(ROLES.Customer), ediCommentCtr)
router.route('/delete/:commentId').delete(Auth, Role(ROLES.Customer), delCommentCtr)


export default router