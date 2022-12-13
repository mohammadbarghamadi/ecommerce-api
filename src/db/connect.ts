import mongoose from 'mongoose'

const uri:string = process.env.DB_URI!
const dbn:string = process.env.DB_NAM!

mongoose.set("strictQuery",false)
mongoose.connect(uri+dbn)