const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')

// ======================================
// # Middlewares
// ======================================
require('express-async-errors')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

// ======================================
// # Routes
// ======================================
app.use('/tasklist', require('./routes/tasklist'))

// Handle errors
app.use('*', (error, req, res, next) => {
  if (error) return res.status(error.status).json(error)
})

module.exports = app
