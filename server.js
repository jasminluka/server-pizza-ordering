const express = require('express')
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')
const xss = require('xss-clean')
const cors = require('cors')

const connectDB = require('./connectDB')
const errorHandler = require('./middlewares/error')

const app = express()

// Connect Database
connectDB()

// Init Middleware
app.use(express.json())

// Sanitize data / prevent NoSQL injection
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Enable CORS
app.use(cors())

app.get('/', (req, res) => {
  res.send('API Running...')
})

// Define routes
app.use('/api/pizzas', require('./routes/api/pizzas'))
app.use('/api/orders', require('./routes/api/orders'))
app.use('/api/auth', require('./routes/api/auth'))
app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)

  // Close server & exit process
  server.close(() => process.exit(1))
})