import express from 'express'
import cors from 'cors'
require('dotenv').config()

export default ({
    router,
}) => {
    const application = express()

    application.use(express.json())
    application.use(cors({
        methods: ['POST', 'GET', 'OPTIONS', 'DELETE', 'PUT']
    }))


    application.use((error, request, response, next) => {
        if (isHttpError(error)) {
            if (error.expose) {
                response.status(error.statusCode).json({
                    message: error.message,
                })
            } else {
                response.status(error.statusCode).json({
                    message: 'Something failed!',
                })
            }
        } else {
            console.error(error.stack)

            response.status(500).json({
                message: 'Something failed!',
            })
        }
    })

    application.use(router)

    return application

}