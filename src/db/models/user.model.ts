import mongoose from "mongoose";
import { isValidEmail } from "../../config/regex";
import { ROLES } from "../../config/roles";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: {
            validator(email: string) {
                if (isValidEmail.test(email)) {
                    throw new Error('Invalid email address!')
                }
            }
        },
        match: [isValidEmail, 'Invalid email address!']
    },
    phone: {
        type: String,
        unique: true,
        maxLength: 10,
        minLength: 10
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    role: {
        type: String,
        required: true,
        default: ROLES.customer
    },
    tokens: [{
        type: String
    }],
    resetToken: { type: String },
    resetExpire: { type: String }
})



const UserModel = mongoose.model('users', userSchema)

export default UserModel