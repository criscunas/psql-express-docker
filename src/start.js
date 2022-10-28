export default ({
    application,
}) => {

    // Start the application, listening on configured port
    const server = application.listen(process.env.PORT, () => {
        console.log(`Application is listening on port ${process.env.SERVER_PORT}`)
        console.log('--------------------------------')

    // Handle the situation where the port is already being used
    }).on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Port ${process.env.SERVER_PORT} is in use. Is the server already running?`)
            process.exit()
        }

        console.error('Error starting application process: ', error)
    })
}

