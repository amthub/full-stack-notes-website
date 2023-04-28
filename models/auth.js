import mongoose from 'mongoose'

const authSchema = new mongoose.Schema({
    email: {type: String},
    password: {type: String},
    admin: {type: Boolean, default: false},
})

const authModel = mongoose.model('auth', authSchema);

export default authModel