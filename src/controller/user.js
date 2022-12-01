import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export default ({
    postgres
}) => {

    return {
        userSignup: async (request, response) => {
            const { username, password} = request.body


            if (!username || !password) {
                return response.status(400).json({
                    error: 'Missing required fields.'
                })
            }

            const hashed_password = await bcrypt.hash(password, 10)

            let user = await postgres.model('user').build({
                username: username,
                password: hashed_password,
            })

            user = await user.save()

            const token = jwt.sign({
                username: user.username
            }, process.env.JWTS, {
                expiresIn: "12h"
            });

            return response.json({
                token: token,
            })
        },

        userLogin: async (request, response) => {
            const {username, password} = request.body

            const user = await postgres.model('user').findOne({
                where: {
                    username: username
                }
            })

            if (!user) {
                return response.status(400).send('User not found')
            }

            const isMatch = await bcrypt.compare(password, user.password)

            if (!isMatch) {
                return response.status(404).send('Invalid email or password.')
            } else {
                const token = jwt.sign({
                    username: user.username
                }, process.env.JWTS, {
                    expiresIn: "12h"
                });

                return response.json({
                    auth: token,
                })
            }
        },
    }
}