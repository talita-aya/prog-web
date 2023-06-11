const express = require('express')

var {getUser, postUser} = require('../controllers/user_controller')

const router = express.Router()

router.get('/users', getUser)
router.post('/users', postUser)

module.exports = router