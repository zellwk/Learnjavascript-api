const express = require('express')
const router = express.Router()

const auth = require('../../controllers/auth')
const tasks = require('../../controllers/tasks')

router.get('/', auth.login, tasks.getTasks)
router.post('/', auth.login, tasks.createTask)
router.put('/:id', auth.login, tasks.updateTask)
router.delete('/:id', auth.login, tasks.deleteTask)

module.exports = router
