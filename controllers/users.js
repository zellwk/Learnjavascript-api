const User = require('../models/User')
const asyncHandler = require('express-async-handler')

exports.getUser = asyncHandler(async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ username })
  res.json(user.toObject())
})

exports.createUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body
  const user = new User({ username, password })
  const ret = await user.save()
  res.json(ret.toObject())
})

exports.deleteUser = asyncHandler(async (req, res) => {
  const { username } = req.params
  const user = await User.findOne({ username })
  await user.remove()
  res.json(user.toObject())
})
