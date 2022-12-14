import { Router } from "express";

import {

    userSignupCtr,
    userSigninCtr,
    userSignoutCtr,
    userSignoutAllCtr,
    userProfiletr,
    userListCtr,
    userUpdateCtr,
    userForgetCtr,
    userResetCtr,
    userDeleteCtr

} from "../controllers/user.js"

const router = Router()


router.route('/signup').post(userSignupCtr)
router.route('/signin').post(userSigninCtr)
router.route('/signout').post(userSignoutCtr)
router.route('/signoutall').post(userSignoutAllCtr)
router.route('/profile').get(userProfiletr)
router.route('/list').get(userListCtr)
router.route('/update').patch(userUpdateCtr)
router.route('/forget').post(userForgetCtr)
router.route('/reset').patch(userResetCtr)
router.route('/delete').delete(userDeleteCtr)


export default router