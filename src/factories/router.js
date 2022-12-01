const express = require('express')

export default ({
    userController,
    welcomeController
}) => {
    const router = express.Router()

    //welcome
    router.route('/').get(welcomeController.welcome)

    //user route
    router.route('/user/signup').post(userController.userSignup)
    router.route('/user/login').post(userController.userLogin)

    return router
}