// Routes for Tasklist App
const express = require('express')
const router = express.Router()

const users = require('./users')
const tasks = require('./tasks')

// Users
router.get('/users/:username', users.getUser)
router.post('/users', users.createUser)
router.delete('/users/:username', users.deleteUser)

// Tasks
router.get('/users/:username/tasks', tasks.getTasks)
router.post('/users/:username/tasks', tasks.createTask)
router.put('/users/:username/tasks/:id', tasks.editTask)
router.delete('/users/:username/tasks/:id', tasks.deleteTask)

module.exports = router
