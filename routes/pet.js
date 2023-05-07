const express = require('express')
const router = express.Router()
const { petGet } = require('../controller/petController')

// router.post('/signUp', userSignUp)

// router.post('/login', userLogin)

router.get('/petPage/:pet_id', petGet)

// router.put('/changeUser/:id', changeUser)


module.exports = router