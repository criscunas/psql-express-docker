import { Passport } from 'passport'

export default ({
    jwtStrategy
}) => {

    const passport = new Passport()

    passport.use(jwtStrategy)

    return passport
}
