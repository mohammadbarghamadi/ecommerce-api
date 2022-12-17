import { Router } from "express";
import { Auth } from "../middlewares/auth.js";
import { Role, ROLES, Access } from "../middlewares/role.js";
import {

    userSignupCtr,
    userSigninCtr,
    userSignoutCtr,
    userSignoutAllCtr,
    userProfiletr,
    userListCtr,
    userSearchCtr,
    userUpdateCtr,
    userForgetCtr,
    userResetCtr,
    userDeleteCtr,
    userEditCtr

} from "../controllers/user.js"

const router = Router()


router.route('/signup').post(userSignupCtr)
router.route('/signin').post(userSigninCtr)
router.route('/signout').get(Auth, userSignoutCtr)
router.route('/signoutall').get(Auth, userSignoutAllCtr)
router.route('/profile').get(Auth, userProfiletr)
router.route('/update').patch(Auth, userUpdateCtr)
router.route('/forget').post(userForgetCtr)
router.route('/reset/:token').patch(userResetCtr)
router.route('/delete').delete(Auth, userDeleteCtr)
router.route('/list').get(Auth, Role(ROLES.Admin), userListCtr)
router.route('/search').get(Auth, Role(ROLES.Admin), userSearchCtr)
router.route('/edit/:userId').patch(Auth, Role(ROLES.Admin), userEditCtr)


export default router