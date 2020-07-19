const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  order: [
    {
      name: {
        type: String,
        required: [true, 'Please provide a name of pizza']
      },
      details: {
        price: {
          type: Number,
          required: [true, 'Please add a price for each pizza']
        },
        amount: {
          type: Number,
          required: [true, 'Please add amount of this pizza']
        },
        total: {
          type: Number,
          required: [true, 'Please add total price of this pizza']
        }
      }
    }
  ],
  name: {
    type: String,
    required: [true, 'Please add a name of person']
  },
  phone: {
    type: String,
    required: [true, 'Please add a phone number']
  },
  address: {
    type: String,
    required: [true, 'Please add your address']
  },
  totalPrice: {
    euro: {
      type: Number,
      required: [true, 'Please add total euro price']
    },
    dollar: {
      type: Number,
      required: [true, 'Please add total dollar price']
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Order', OrderSchema)