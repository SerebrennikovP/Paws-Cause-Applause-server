const express = require('express')
const router = express.Router()
const { petGet, searchPet, breedsGet, randomPets, changeStatus, myPets } = require('../controller/petController')
const { auth } = require('../middleware/userMiddleware')

router.get('/petPage/:pet_id', petGet)

router.get('/search', searchPet)

router.post('/getBreeds', breedsGet)

router.get('/getRandom', randomPets)

router.put('/changeStatus/:pet_id', auth, changeStatus)

router.get('/user/:token', auth, myPets)

module.exports = router