export default ({

}) => {
    return {
        welcome: async (request, response) => {
            return response.send('Welcome from docker 🐳 ')
        }
    }
}