// import main modules
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import cookie from 'cookie-parser'

// connect to database
import './db/connect.js'

// import express error handler
import errorHandler from './middlewares/error.js'
import { events } from './utils/logger.js'

// import main routes
import userRoute from './routes/user.route.js'
import prodRoute from './routes/product.route.js'
import cateRoute from './routes/category.route.js'
import tagsRoute from './routes/tag.route.js'
import fileRoute from './routes/file.route.js'
import cartRoute from './routes/cart.route.js'
import ordeRoute from './routes/order.route.js'
import paymRoute from './routes/payment.route.js'
import favoRoute from './routes/favourite.route.js'
import cmntRoute from './routes/comment.route.js'
import locaRoute from './routes/location.route.js'
import addrRoute from './routes/address.route.js'


// configure environment variables
dotenv.config()

// setup express app
const app = express()

// Node and express Port setup
const PORT = process.env.PORT || 8200

// express main middlewares setup
app.use(express.urlencoded({ extended: true })) // to parses urlencoded payloads 
app.use(express.json()) // to parses request body as json
app.use(cookie()) // parse incoming cookies from header
app.use(cors()) // let's frontend app to send api request without cors issues
app.use(events) // write event to disk


// here is I will import main apies routes
app.use('/api/user', userRoute)
app.use('/api/prod', prodRoute)
app.use('/api/cate', cateRoute)
app.use('/api/tags', tagsRoute)
app.use('/api/file', fileRoute)
app.use('/api/cart', cartRoute)
app.use('/api/orde', ordeRoute)
app.use('/api/paym', paymRoute)
app.use('/api/favo', favoRoute)
app.use('/api/cmnt', cmntRoute)
app.use('/api/loca', locaRoute)
app.use('/api/addr', addrRoute)

// express error handler middleware
app.use(errorHandler)

const server = app.listen(PORT, () => console.log(`nodejs server start and running with express on port:${PORT}`))
process.on("unhandledRejection", (err, promise) => {
    console.log("Logged Error" + err)
    server.close(() => process.exit(1))
})