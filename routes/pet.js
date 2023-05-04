const express = require('express')
const router = express.Router()
// const { } = require('../controller/petController')

// router.post('/signUp', userSignUp)

// router.post('/login', userLogin)

router.post('/getPet', petGet)

// router.put('/changeUser/:id', changeUser)


module.exports = router