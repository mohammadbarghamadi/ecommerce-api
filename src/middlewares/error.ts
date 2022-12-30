import { ErrorRequestHandler } from "express";
import ErrorResponse from "../utils/error.js";
import { logger } from "../utils/logger.js";


const errorHandler: ErrorRequestHandler = (err, req, res, next) => {

    const { ip, originalUrl, method } = req

    let error = { ...err }
    error.message = err.message

    logger({ ip, originalUrl, method, errorName: err.name, errorMessage: err.message, status: err.code || 500 })

    console.log(err)

    if (err.code === 11000) {
        const message = 'Duplicate field value entered'
        error = new ErrorResponse(message, 400)
    }

    if (err.error) {
        error = new ErrorResponse(err.message, err.code)
    }

    res.status(error.statusCode || err.code || 500).json({
        success: false,
        error: error.message || 'Server Error'
    })

}

export default errorHandler