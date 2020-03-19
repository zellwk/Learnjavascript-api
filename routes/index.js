const express = require('express')
const router = express.Router()

// For tasklists app
router.use('/users', require('./users'))
router.use('/tasks', require('./tasks'))

// For Infinite scroll
router.use('/letters', require('./letters'))

module.exports = router
