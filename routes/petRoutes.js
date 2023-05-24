const express = require('express')
const router = express.Router()
const { petGet, searchPet, breedsGet, randomPets, changeStatus, myPets, addFavorite, favoritePets } = require('../controller/petController')
const { auth } = require('../middleware/userMiddleware')

router.get('/petPage/:pet_id', petGet)

router.get('/search', searchPet)

router.post('/getBreeds', breedsGet)

router.get('/getRandom', randomPets)

router.put('/changeStatus/:pet_id', auth, changeStatus)

router.put('/favorite', auth, addFavorite)

router.get('/user/:token', auth, myPets)

router.post('/user/favorite/:token', auth, favoritePets)

module.exports = router