import { Router } from "express";
import { Auth } from "../middlewares/auth.js";
import { Role, ROLES, Access } from "../middlewares/role.js";
import {

    userSignupCtr,
    userSigninCtr,
    userSignoutCtr,
    userSignoutAllCtr,
    userProfiletr,
    userSearchCtr,
    userUpdateCtr,
    userForgetCtr,
    userResetCtr,
    userDeleteCtr,
    userCreateCtr,
    userListCtr,
    userEditCtr,
    userRemoveCtr

} from "../controllers/user.js"

const router = Router()


router.route('/signup').post(userSignupCtr)
router.route('/signin').post(userSigninCtr)
router.route('/signout').post(Auth, userSignoutCtr)
router.route('/signoutall').post(Auth, userSignoutAllCtr)
router.route('/profile').get(Auth, userProfiletr)
router.route('/update').patch(Auth, userUpdateCtr)
router.route('/forgot').post(userForgetCtr)
router.route('/reset/:resetToken').patch(userResetCtr)
router.route('/delete').delete(Auth, userDeleteCtr)
// user management
router.route('/list').get(Auth, Role(ROLES.Admin), userListCtr)
router.route('/search').get(Auth, Role(ROLES.Admin), userSearchCtr)
router.route('/create').post(Auth, Role(ROLES.Admin), userCreateCtr)
router.route('/edit/:userId').patch(Auth, Role(ROLES.Admin), userEditCtr)
router.route('/remove/:userId').delete(Auth, Role(ROLES.Admin), userRemoveCtr)


export default router