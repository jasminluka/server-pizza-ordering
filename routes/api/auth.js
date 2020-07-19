const express = require('express')
const router = express.Router()

const User = require('../../models/User')
const ErrorResponse = require('../../utils/errorResponse')
const { protect } = require('../../middlewares/auth')

// @desc    REGISTER | Register user and get token
// @route   POST api/auth/register
// @access  Public
router.post('/register', async (req, res, next) => {
  const { name, email, password } = req.body

  try {
    // Create user
    const user = await User.create({
      name,
      email,
      password
    })

    const token = user.getSignedJwtToken()

    res.status(200).json({
      success: true,
      token
    })
  }
  catch (err) {
    res.locals.type = 'User'
    next(err)
  }
})


// @desc    LOGIN | Login user and get token
// @route   POST api/auth/login
// @access  Public
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body

  // Validate email and password
  if (!email || !password) {
    return next(new ErrorResponse('Please provide an email and password', 400))
  }
  
  try {
    // Check for user
    const user = await User.findOne({ email }).select('+password') // Get also password since it is not selected by default in our model

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401))
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password)

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401))
    }

    const token = user.getSignedJwtToken()

    res.status(200).json({
      success: true,
      token
    })
  }
  catch (err) {
    next(err)
  }
})


// @desc    Get current logged in user
// @route   GET api/auth/me
// @access  Private
router.get('/me', protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)

    res.status(200).json({
      success: true,
      data: user
    })
  }
  catch (err) {
    next(err)
  }
})

module.exports = router