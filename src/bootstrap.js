import { createContainer, asFunction, asValue } from 'awilix'
import start from './start'

// setup
import applicationFactory from './factories/application'

//mongo db
import mongoFactory from './factories/mongo'

// auth
import authFactory from './factories/auth'
import jwtStrategyFactory from './factories/auth/jwt'

//router
import routerFactory from './factories/router'

//controllers
import userController from './controller/user'
import linkController from './controller/link'

const container = createContainer()

container.register({

    start: asFunction(start).singleton(),

    router: asFunction(routerFactory).singleton(),

    application: asFunction(applicationFactory).singleton(),

    mongoConnection: asFunction(mongoFactory).singleton(),

    authentication: asFunction(authFactory).singleton(),
    jwtStrategy: asFunction(jwtStrategyFactory).singleton(),

    userController: asFunction(userController).singleton(),
    linkController: asFunction(linkController).singleton()

})

Promise.all([
    container.resolve('mongoConnection'),
]).then(([
    mongoose,
]) => {
    container.register({
        mongoose: asValue(mongoose)
    })

    container.resolve('start')
})

