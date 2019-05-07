const express = require('express')
const router = express.Router()

const users = require('../../controllers/users')

router.post('/', users.createUser)
router.get('/:username', users.getUser)
router.delete('/:username', users.deleteUser)

module.exports = router
