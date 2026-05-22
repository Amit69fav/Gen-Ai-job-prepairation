const { Router } = require('express')
const AuthController = require('../controllers/auth.controller.js')
const authUser = require('../middlewares/auth.middleware.js')

const authRouter = Router()

/**
 * @route POST/api/auth/register
 * @description register anew user
 * @access public
 */
authRouter.post("/register",AuthController.registerUserController)

/**
 * @route POST/api/auth/login
 * @description login a user
 * @access public
 */
authRouter.post("/login",AuthController.loginUserController)        

/**
 * @route GET/api/auth/logout
 * @description logout a user by blacklisting the token
 * @access public
 */
authRouter.get("/logout",AuthController.logoutUserController)

/**
 * @route GET/api/auth/get-me
 * @description get the details of the logged in user
 * @access private
 */
authRouter.get("/get-me",authUser,AuthController.getMeController)

module.exports = authRouter;
