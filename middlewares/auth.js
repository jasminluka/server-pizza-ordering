const jwt = require('jsonwebtoken')

const User = require('../models/User')
const ErrorResponse = require('../utils/errorResponse')
const { secretKey } = require('../config')

// @desc    Check if is authenticated | Protected Route
exports.protect = async (req, res, next) => {
  let token

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1]
  }

  // Make sure token exist
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, secretKey)
    
    req.user = await User.findById(decoded.id)

    if (!req.user) {
      return next(new ErrorResponse('Not authorized to access this route', 401))
    }

    next()
  }
  catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401))
  }
}

// Grant access to specific roles
exports.authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ErrorResponse(`User role: ${req.user.role} is not authorized to access this route`, 403))
  }

  next()
}