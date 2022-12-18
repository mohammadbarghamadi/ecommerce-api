import mongoose, { Types, Model, Document, Schema } from "mongoose";
import crypto from "crypto"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { isValidEmail } from "../../config/regex.js";
import { ROLES } from "../../middlewares/role.js";


export interface UserInt {
    name: string
    username: string
    email: string
    address?: Types.ObjectId
    phone?: string
    password: string
    role: number
    cart: Types.ObjectId
    tokens?: { token: string }[]
    resetToken?: string
    resetExpire?: string
}

interface CredentialPromInt {
    error: boolean,
    data: UserInt
}

interface UserSchemaInt extends UserInt, CredentialPromInt, Document {
    genAuthToken: () => Promise<string>
    genResetToken: () => Promise<string>
}

interface UserModelInt extends Model<UserSchemaInt> {
    resetPassword: (token: string, password: string) => Promise<boolean>
    findByCredentials: (email: string, phone: string, password: string) => Promise<UserSchemaInt>
}

const userSchema: Schema<UserSchemaInt> = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
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
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'carts'
    },
    password: {
        type: String,
        required: true,
        minLength: 7
    },
    role: {
        type: Number,
        required: true,
        default: ROLES.Customer
    },
    tokens: [{
        token: {
            type: String
        }
    }],
    resetToken: { type: String, select: false },
    resetExpire: { type: Date, select: false }
}, {
    timestamps: true
})

// remove password and tokens field to prevent user information exposure
userSchema.methods.toJSON = function () {
    const user = this.toObject()
    delete user.password
    delete user.tokens
    return user
}

// generate auth token and saving it into DB
userSchema.methods.genAuthToken = async function () {
    const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY!, { expiresIn: '7d' })
    this.tokens = this.tokens.concat({ token })
    await this.save()
    return token
}

// check user password with findByCredintial method
userSchema.statics.findByCredentials = async function (email, phone, password) {
    let user
    if (email) user = await UserModel.findOne({ email })
    if (phone) user = await UserModel.findOne({ phone })
    if (!user) return { error: true }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return { error: true }
    return user
}

// Hash user password before saving it into DB
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }
})

// generate reset token
userSchema.methods.genResetToken = async function () {
    const data = crypto.randomBytes(40).toString('hex')
    const resetToken = crypto.createHash('sha256').update(data).digest('hex')
    this.resetToken = resetToken
    this.resetExpire = Date.now() + 5 * 60 * 1000
    await this.save()
    return data
}

// reset user password with received token
userSchema.statics.resetPassword = async function (token: string, password: string) {
    const resetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await UserModel.findOne({ resetToken, resetExpire: { $gte: Date.now() } }).select('resetToken resetExpire')
    if (!user) return false
    user.password = password
    user.resetToken = ''
    user.resetExpire = ''
    await user.save()
    return true
}

userSchema.pre('remove', function () {
    //  I will remove user carts
})

const UserModel = mongoose.model<UserInt, UserModelInt>('users', userSchema)

export default UserModel