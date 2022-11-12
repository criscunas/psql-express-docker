import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'

export default ({
    mongoose,
}) => {

    return {
        userSignup: async (request, response) => {
            const { username, password} = request.body

            if (!password || !username) {
                return response.status(400).json({
                    error: 'Missing required fields.'
                })
            }

            const validUsername = await mongoose.model('user').findOne({
                username: username
            })

            if (validUsername) {
                return response.status(400).send('Username already taken.')
            }


            const hashed_password = await bcrypt.hash(password, 10)

            const userModel = mongoose.model('user')

            const user = new userModel()
            user.username = username
            user.hashed_password = hashed_password

            user.save((err) => {
                if (!err) {
                    console.log('Created user profile')
                } else {
                    console.log('Error', err)
                    return response.json({
                        error: 'Error creating user profile.'
                    })
                }
            })

            const token = jwt.sign({
                id : user._id,
                username: user.username
            }, process.env.JWTS, {
                expiresIn: "12h"
            });

            return response.json({
                auth: token,
            })
        },

        userLogin: async (request, response) => {
            const {username, password} = request.body

            const user = await mongoose.model('user').findOne({
                username: username
            })

            if (!user) {
                return response.status(400).send('Profile not found')
            }

            const isMatch = await bcrypt.compare(password, user.hashed_password)

            if (!isMatch) {
                return response.status(404).send('Invalid email or password.')
            } else {
                const token = jwt.sign({
                    id : user._id,
                    username: user.username
                }, process.env.JWTS, {
                    expiresIn: "12h"
                });

                return response.json({
                    auth: token,
                })
            }
        },

        getProfile: async (request, response) => {
            const username = request.params.username

            let profile = await mongoose.model('user').findOne({
                username: username
            }).select(['username', 'links'])

            if (!profile) {
                return response.status(400).send('User not found.')
            }

            return response.json({
                profile
            })
        },

        getSelf: async (request, response) => {
            const user = request.user

            const { username, links } = user

            return response.json({
                links: links,
                username: username
            })
        }
    }
}