const mongoose = require('mongoose')
const { mongoUser, mongoPassword, mongoDB } = require('./config')

// Connect Database
const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@pizza-ordering.roel2.mongodb.net/${mongoDB}?retryWrites=true&w=majority`, { 
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      // useFindAndModify: false
    })

    console.log('MongoDB Connected')
  }
  catch (err) {
    console.log(err.message)

    // Exit process with failure
    process.exit(1)
  }
}

module.exports = connectDB