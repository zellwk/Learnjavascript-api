const express = require('express')
const bodyParser = require('body-parser')
const createError = require('http-errors')
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
const Task = require('./models/Task')
const User = require('./models/User')

// Users
app.post('/users', async (req, res) => {
  const { username } = req.body
  const newUser = new User({ username })

  const doc = await newUser.save()
  return res.json(`user ${doc.username} created`)
})

app.delete('/users/:username', async (req, res, next) => {
  const { username } = req.params

  // Delete all tasks by the user
  const user = await User.findOne({ username })
  await Task.remove({ user })
  await User.remove({ username })
  res.json('User deleted')
})

// Tasks
// Search for list of tasks that are done still required. Maybe a query parameter?
app.get('/users/:username/tasks', async (req, res) => {
  const { username } = req.params

  const user = await User.findOne({ username }).populate('tasks').exec()
  const tasks = user.toObject().tasks
  return res.json(tasks)
})

app.post('/users/:username/tasks', async (req, res) => {
  const { task, done } = req.body
  const { username } = req.params

  const user = await User.findOne({ username })
  if (!user) throw createError(400, 'Cannot create tasks for a user that does not exists')

  const newTask = new Task({ task, done, user })
  const doc = await newTask.save()
  return res.json(doc.toObject())
})

app.put('/users/:username/tasks/:id', (req, res, next) => {
  const { id: _id } = req.params
  const { task, done } = req.body

  Task.findOneAndUpdate({ _id }, { task, done }, { new: true })
    .then(doc => res.json(doc))
    .catch(next)
})

app.delete('/users/:username/tasks/:id', (req, res, next) => {
  const { id: _id } = req.params

  Task.findOneAndDelete({ _id })
    .then(doc => {
      if (!doc) return next(createError(404, 'Task not found'))
      res.json({
        message: 'Task deleted',
        deletedTask: doc
      })
    })
    .catch(next)
})

// Handle errors
app.use('*', (error, req, res, next) => {
  if (error) return res.status(error.status).json(error)
})

module.exports = app
