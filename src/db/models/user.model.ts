import mongoose, { Types, Model, Document, Schema } from "mongoose";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import { isValidEmail } from "../../config/regex.js";
import { ROLES } from "../../config/roles.js";

dotenv.config({ path: '.config' })

interface UserSchemaInt {
    name: string
    username: string
    email: string
    address?: Types.ObjectId
    phone?: string
    password: string
    role: number
    tokens?: {}[]
    resetToken?: string
    resetExpire?: string
}

interface CredentialPromInt {
    success: boolean,
    data:  UserSchemaInt
}

interface UserModelInt extends Model<UserSchemaInt> {
    findByCredentials: (email: string, phone: string, password: string) => Promise<CredentialPromInt>
}

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
        type: Number,
        required: true,
        default: ROLES.customer
    },
    tokens: [{
        type: String
    }],
    resetToken: { type: String },
    resetExpire: { type: String }
}, {
    timestamps: true
})

// check user password with findByCredintial method
userSchema.statics.findByCredintial = async function (email, phone, password) {

    let user
    if (email) user = await UserModel.findOne({ email })
    if (phone) user = await UserModel.findOne({ phone })
    if (!user) return { success: false}
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return { success: false }
    return {success: true, data: user}

}

// Hash user password before saving it into DB
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

const UserModel = mongoose.model<UserSchemaInt, UserModelInt>('users', userSchema)

export default UserModel