import express from 'express'

export default ({
    authentication,
    userController,
    linkController,
}) => {
    const router = express.Router()

    const isUser = authentication.authenticate('jwt', { session: false})

    // user route
    router.route('/user/signup').post(userController.userSignup)
    router.route('/user/login').post(userController.userLogin)
    router.route('/user/self').get(isUser, userController.getSelf)



    // public profile route
    router.route('/profile/:username').get(userController.getProfile)

    // link routes
    router.route('/link/create').post(isUser, linkController.createLink)
    router.route('/link/:id').delete(isUser, linkController.deleteLink)

    return router
}