const mongoose = require('mongoose')

export default () => {
    try {
        mongoose.connect(process.env.MONGO_DB_DEVELOP_URI)
    } catch (error) {
        console.log('Error conecting to Mongo', error)
    } finally {
        console.log('Connected to mongo')
    }

    let mongoDb = mongoose.connection

    // mongoDb.on('error', () => {
    //     console.error("Unable to connect")
    // })

    // mongoDb.on('open', () => {
    //     console.log('Connected to mongo')
    // })

    require('../mongo/schemas/user')

    return mongoDb

}