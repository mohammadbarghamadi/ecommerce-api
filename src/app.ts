// import main modules
import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'

// import main routes
// import {
//     userRoute,
//     prodRoute,
//     cartRoute,
//     ordeRoute,
//     favoRoute
// } from './routes/user.route.js'

// configure environment variables
dotenv.config({ path: '.config' })

// setup express app
const app = express()

// Node and express Port setup
const PORT = process.env.PORT || 8200

// express main middlewares setup
app.use(express.urlencoded({ extended: true })) // to parses urlencoded payloads 
app.use(express.json()) // to parses request body as json
app.use(cors()) // let's frontend app to send api request without cors issues


// here is I will import main apies routes
// app.use('/api/user',userRoute)
// app.use('/api/prod',prodRoute)
// app.use('/api/cart',cartRoute)
// app.use('/api/orde',ordeRoute)
// app.use('/api/favo',favoRoute)


// here I will import express error handler middleware
// app.use(errorHandler)

app.listen(PORT, () => console.log(`nodejs server start and running with express on port:${PORT}`))