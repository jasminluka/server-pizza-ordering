const express = require('express')
const router = express.Router()

const Order = require('../../models/Order')
const { protect, authorize } = require('../../middlewares/auth')

// @desc    Get all Orders
// @route   GET api/orders
// @access  Private - Admin only
router.get('/', protect, authorize('admin'), async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      data: orders
    })
  }
  catch (err) {
    next(err)  
  }
})


// @desc    Order pizza as Guest
// @route   POST api/orders
// @access  Public
router.post('/', async (req, res, next) => {
  const myOrder = {
    ...req.body,
    order: Object.entries(req.body.order).map(([name, details]) => ({ name, details }))
  }

  try {
    const order = await Order.create(myOrder)

    res.status(201).json({
      success: true,
      data: order
    })
  }
  catch (err) {
    next(err)  
  }
})


// @desc    Order pizza as User
// @route   POST api/orders/user
// @access  Private
router.post('/user', protect, async (req, res, next) => {
  const myOrder = {
    ...req.body,
    user: req.user.id,
    order: Object.entries(req.body.order).map(([name, details]) => ({ name, details }))
  }

  try {
    const order = await Order.create(myOrder)

    res.status(201).json({
      success: true,
      data: order
    })
  }
  catch (err) {
    next(err)  
  }
})


// @desc    Get Orders of a logged User
// @route   GET api/orders/user
// @access  Private
router.get('/user', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      data: orders
    })
  }
  catch (err) {
    next(err)  
  }
})


// @desc    Get a Single Order of a logged User
// @route   GET api/orders/:id
// @access  Private
router.get('/:id', protect, async (req, res, next) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, user: req.user.id })

    res.status(200).json({
      success: true,
      data: order
    })
  }
  catch (err) {
    res.locals.type = 'Order'
    next(err)  
  }
})

module.exports = router