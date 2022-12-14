import mongoose from "mongoose";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { isValidEmail } from "../../config/regex.js";
import { ROLES } from "../../config/roles.js";

dotenv.config({ path: '.config' })

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
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'addresses'
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



userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password,salt)
    }
})

const UserModel = mongoose.model('users', userSchema)

export default UserModel