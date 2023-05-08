const express = require('express')
const router = express.Router()
const { petGet, searchPet, breedsGet, randomPets } = require('../controller/petController')

router.get('/petPage/:pet_id', petGet)

router.get('/search', searchPet)

router.post('/getBreeds', breedsGet)

router.get('/getRandom', randomPets)

module.exports = router