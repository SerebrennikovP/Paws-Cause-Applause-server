const express = require('express')
const router = express.Router()
const { petGet, searchPet, breedsGet, randomPets, changeStatus, myPets, addFavorite, favoritePets, addPet, getAllPets, putPet } = require('../controller/petController')
const { auth, isAdmin } = require('../middleware/userMiddleware')
const { upload, checkSchemaForPet } = require('../middleware/petMiddleware')

router.get('/petPage/:pet_id', petGet)

router.get('/search', searchPet)

router.post('/getBreeds', breedsGet)

router.get('/getRandom', randomPets)

router.put('/changeStatus/:pet_id', auth, changeStatus)

router.put('/favorite', auth, addFavorite)

router.get('/user/:token', auth, myPets)

router.post('/user/favorite/:token', auth, favoritePets)

router.post('/add', auth, isAdmin, upload.single('picture'), checkSchemaForPet, addPet)

router.put('/put', auth, isAdmin, upload.single('picture'), checkSchemaForPet, putPet)

router.get('/getAllPets', auth, isAdmin, getAllPets)

module.exports = router