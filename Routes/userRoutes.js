const express = require('express');
const userRouter = express.Router();
const userController = require('./../Controllers/UserController');

userRouter.route('/signup').post(userController.signupPost);
userRouter.route('/signin').post(userController.signinPost);
userRouter.route('/logout').get(userController.logout);
module.exports = userRouter;
