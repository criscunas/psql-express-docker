import { Strategy, ExtractJwt } from 'passport-jwt'
import { decode, verify } from 'jsonwebtoken'

export default ({
    mongoose,
}) => {
    const strategy = new Strategy({
        secretOrKey: process.env.JWTS,
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
        passReqToCallback: true
    },

    /**
     * Callback that is executed on the incoming request
     * @param  {Object}   request express request object
     * @param  {Object}   payload request payload
     * @param  {Function} callback
     * @return {Function}
     */
    (request, payload, done) => {
        // Save the JWT from the header
        const token = request.headers.authorization.split(' ')[1]

        // Verify the JWT appears in auth, is a legitimate token, and hasn't been manipulated
        verify(token, process.env.JWTS, async (error, decodedToken) => {


            if (error) {
                console.log(`Authentication token invalid...`, error)
                return done(null, false)
            }

            const user = await mongoose.model('user').findOne({
                where: {
                    _id: decodedToken.id
                }
            })

            if (!user) {
                console.log(`Auth token for user that does not exist`, error)
                return done(null, false)
            }

            if (user) {
                // Attach data to request object
                request.user = user

                // If all is well, return the payload
                if (done) return done(null, user)
            }

        })
    })

    return strategy
}
