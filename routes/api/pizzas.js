const express = require('express')
const router = express.Router()

const Pizza = require('../../models/Pizza')
const ErrorResponse = require('../../utils/errorResponse')
const { protect, authorize } = require('../../middlewares/auth')

// @desc    Get all pizzas
// @route   GET api/pizzas
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const pizzas = await Pizza.find()
    
    res.status(200).json({
      success: true,
      pizzas
    })
  }
  catch (err) {
    next(err)
  }
})


// @desc    Add pizza
// @route   POST api/pizzas
// @access  Private - Admin only
router.post('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    // Create user
    const pizza = await Pizza.create(req.body)

    res.status(201).json({
      success: true,
      data: pizza
    })
  }
  catch (err) {
    res.locals.type = 'Pizza'
    next(err)
  }
})


// @desc    Delete a pizza
// @route   DELETE api/pizzas/:id
// @access  Private - Admin only
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const pizza = await Pizza.findById(req.params.id)
    
    if (!pizza) {
      return next(new ErrorResponse('Pizza not found', 404))
    }

    await pizza.remove()

    res.status(200).json({
      success: true
    })
  }
  catch (err) {
    res.locals.type = 'Pizza'
    next(err)
  }
})

module.exports = router