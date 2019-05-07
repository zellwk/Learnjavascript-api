const User = require('../models/User')
const atob = require('atob')
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')

exports.login = asyncHandler(async (req, res, next) => {
  const { authorization } = req.headers
  if (!authorization) throw createError(401)

  const creds = authorization.split(' ')[1]
  const decoded = atob(creds)
  const [username, password] = decoded.split(':')

  const user = await User.findOne({ username })
  const verified = user.verifyPassword(password)
  if (!verified) throw createError(401, 'Wrong Password')

  req.body.username = username
  req.body.userid = user._id

  next()
})
