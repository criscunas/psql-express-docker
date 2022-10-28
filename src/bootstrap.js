import { createContainer, asFunction, asValue } from 'awilix'
import start from './start'

// setup
import applicationFactory from './factories/application'

const container = createContainer()

container.register({

    start: asFunction(start).singleton(),

    application: asFunction(applicationFactory).singleton()

})

container.resolve('start')