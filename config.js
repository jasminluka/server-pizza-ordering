require('dotenv').config()

module.exports = {
  mongoUser: process.env.MONGO_USER,
  mongoPassword: process.env.MONGO_PASSWORD,
  mongoDB: process.env.MONGO_DB,
  secretKey: process.env.SECRET_KEY
}