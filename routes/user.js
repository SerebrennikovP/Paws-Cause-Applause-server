const express = require('express')
const router = express.Router()
const { userLogin, userSignUp, userGet, changeUser } = require('../controller/userController')

// router.post('/signUp', userSignUp)

// router.post('/login', userLogin)

router.post('/getPet', userGet)

// router.put('/changeUser/:id', changeUser)


module.exports = router