const Task = require('../models/Task')
const asyncHandler = require('express-async-handler')

exports.getTasks = asyncHandler(async (req, res) => {
  const { userid } = req.body
  const tasks = await Task.find({ user: userid })
  res.json(tasks)
})

exports.createTask = asyncHandler(async (req, res) => {
  const { userid, name, done = false } = req.body
  const task = new Task({ name, done, user: userid })
  const ret = await task.save()
  res.json(ret)
})

exports.updateTask = asyncHandler(async (req, res) => {
  const { name, done } = req.body
  const { id } = req.params

  const task = await Task.findById(id)
  if (name) task.name = name
  task.done = done

  const ret = await task.save()
  res.json(ret)
})

exports.deleteTask = asyncHandler(async (req, res) => {
  const { id } = req.params
  const task = await Task.findById(id)
  const ret = await task.remove()

  res.json(ret)
})
