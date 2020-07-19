const ErrorResponse = require('../utils/errorResponse')

// @desc    Error handler
const errorHandler = (err, req, res, next) => {
  let error = {
    ...err,
    message: err.message  // Message is not enumerable so its not part of the spread
  }

  // Mongoose bad ObjectId.
  if (err.name === 'CastError') {
    const message = `${res.locals.type} not found!`
    error = new ErrorResponse(message, 404)
  }

  // Mongoose duplicate key
  // Since err.name is MongoError and other errors will use it, we will check for code instead.
  if (err.code === 11000) {
    const message = `${res.locals.type} already exists!`
    error = new ErrorResponse(message, 400)
  }

  // Check for empty fields that are required.
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message)
    error = new ErrorResponse(message, 400)
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error'
  })
}

module.exports = errorHandler