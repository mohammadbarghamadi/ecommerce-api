import { ErrorRequestHandler } from "express";
import ErrorResponse from "../utils/error.js";


const errorHandler:ErrorRequestHandler = (err, req, res, next) => {
    
    let error = {...err}
    error.message = err.message

    console.log(err)

    if(err.code === 11000) {
        const message = 'Duplicate field value entered'
        error = new ErrorResponse(message,400)
    }

    // if(err.name === 'ValidationError') {
    //     const message = Object.values(err.errors).map((item) => item.message)
    //     error = new ErrorResponse(message,400)
    // }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })

}

export default errorHandler