const express = require('express')
const router = express.Router()
const { petGet, searchPet, breedsGet, randomPets, changeStatus } = require('../controller/petController')

router.get('/petPage/:pet_id', petGet)

router.get('/search', searchPet)

router.post('/getBreeds', breedsGet)

router.get('/getRandom', randomPets)

router.put('/changeStatus/:pet_id', changeStatus)

module.exports = router