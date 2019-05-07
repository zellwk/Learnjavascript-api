// Routes for Tasklist App
const express = require('express')
const router = express.Router()

router.use('/users', require('./users'))
router.use('/tasks', require('./tasks'))

// const tasks = require('../controllers/tasks')

// // Tasks
// router.get('/users/:username/tasks', tasks.getTasks)
// router.post('/users/:username/tasks', tasks.createTask)
// router.put('/users/:username/tasks/:id', tasks.editTask)
// router.delete('/users/:username/tasks/:id', tasks.deleteTask)

module.exports = router
