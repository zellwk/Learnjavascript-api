const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
const createError = require('http-errors')
const morgan = require('morgan')

// ======================================
// # Middlewares
// ======================================
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

// ======================================
// # Routes
// ======================================
app.use('/', require('../routes'))

app.use((req, res, next) => {
  next(createError(404))
})

// Handle errors
app.use('*', (error, req, res, next) => {
  if (!error) return next()

  res.status(error.status || 500)
  res.json(error)
})

module.exports = app
