import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
        topic: {type: String},
        content: {type: String},
        username: {type: String},
        like: {type: Boolean, default: false},
    })
    
    
const userModel = mongoose.model('user', userSchema);
    

export default userModel;
