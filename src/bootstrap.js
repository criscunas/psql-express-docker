import { createContainer, asFunction, asValue } from "awilix"

import start from '../src/start'

// setup
import applicationFactory from './factories/application'

//postgres db
import postgresConnection from './factories/postgres/index'

//router
import routerFactory from './factories/router'

//controllers
import userController from './controller/user.js'
import welcomeController from './controller/welcome.js'

const container = createContainer()

container.register({

    start: asFunction(start).singleton(),

    router: asFunction(routerFactory).singleton(),

    application: asFunction(applicationFactory).singleton(),

    userController: asFunction(userController).singleton(),
    welcomeController: asFunction(welcomeController).singleton(),

    postgresConnection: asFunction(postgresConnection).singleton()
})

Promise.all([
    container.resolve('postgresConnection'),
]).then(([
    postgres,
]) => {
    container.register({
        postgres: asValue(postgres)
    })

    container.resolve('start')
})
