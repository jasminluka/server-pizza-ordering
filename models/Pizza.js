const mongoose = require('mongoose')

const PizzaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a pizza name'],
    unique: true
  },
  ingredients: {
    type: String,
    required: [true, 'Please add ingredients about pizza']
  },
  prices: [
    {
      size: {
        type: String,
        enum: ['small', 'medium', 'large'],
        required: [true, 'Please provide a size for pizza']
      },
      price: {
        type: Number,
        required: [true, 'Please provide a price for each size of pizza']
      }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Pizza', PizzaSchema)