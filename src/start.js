export default ({
    postgres,
    application
}) => {

    const port = process.env.PORT || 8080
    const host = process.env.HOST || '0.0.0.0'
    // Start the application, listening on configured port
    const server = application.listen(port, host, () => {
        console.log(`Application is listening on port ${process.env.PORT}`)
        console.log('--------------------------------')

    // Handle the situation where the port is already being used
    }).on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`Port ${process.env.PORT} is in use. Is the server already running?`)
            process.exit()
        }

        console.error('Error starting application process: ', error)
    })
}

