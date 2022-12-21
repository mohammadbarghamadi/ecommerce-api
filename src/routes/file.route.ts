import { Router } from "express";
import fileUpload from "express-fileupload";
import { Auth } from "../middlewares/auth.js";
import { Role, ROLES, Access } from "../middlewares/role.js";
import { fsLimit, fpExist, fxLimit } from "../middlewares/upload.js";

import {
    fileUploadCtr,
    fileUpdateCtr,
    fileDeleteCtr,
    fileViewCtr,
    fileListCtr
} from '../controllers/file.js'

const router = Router()

router.route('/upload').post(
    Auth,
    Role(ROLES.Seller, Access.Higher),
    fileUpload({ createParentPath: true }),
    fpExist,
    fsLimit(20 * 1024 * 1024),
    fxLimit(['jpg','jpeg','png','mp3','mpeg']),
    fileUploadCtr
)
router.route('/update').patch(Auth, Role(ROLES.Seller, Access.Higher), fileUpdateCtr)
router.route('/delete').delete(Auth, Role(ROLES.Seller, Access.Higher), fileDeleteCtr)
router.route('/view').get(Auth, Role(ROLES.Seller, Access.Higher), fileViewCtr)
router.route('/list').get(Auth, Role(ROLES.Seller, Access.Higher), fileListCtr)


export default router