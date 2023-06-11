const express = require('express')

var {getUser, getUserID, postUser, editUser, deleteUser, postUserAdmin} = require('../controllers/user_controller')

const router = express.Router()

router.get('/', postUserAdmin)
router.get('/users', getUser)
router.get('/users/:id', getUserID)
router.post('/users', postUser)
router.put('/users/:id', editUser)
router.delete('/users/:id', deleteUser)

module.exports = router