import { Schema, model } from 'mongoose'

const user = new Schema({
    user_id: String,
    username: String,
    hashed_password: String,
    links: [{
        platform: String,
        url: String,
        caption: String,
    }],
})

export default model('user', user)