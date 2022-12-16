import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config()

const uri:string = process.env.DB_URI!
const dbn:string = process.env.DB_NAM!

mongoose.set("strictQuery",false)
mongoose.connect(uri+dbn)