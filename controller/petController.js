const petModel = require("../models/petModel")

async function petGet(req, res) {
    try {
        const petObj = await petModel.findPetByIdModel(req.params.pet_id)
        res.status(200).send(petObj)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function searchPet(req, res) {
    try {
        const foundedPets = await petModel.searchPetModel(req.query)
        res.status(200).send(foundedPets)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function breedsGet(req, res) {
    try {
        const uniqueBreeds = await petModel.breedsGetModel(req.body.type)
        res.status(200).send(uniqueBreeds)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function randomPets(req, res) {
    try {
        const pets = await petModel.randomPetsModel()
        res.status(200).send(pets)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function changeStatus(req, res) {
    try {
        const petObj = await petModel.findPetByIdModel(req.params.pet_id)
        let adoption_status
        switch (req.body.handler) {
            case 'return': adoption_status = "Available"
                break;
            case 'foster': adoption_status = "Fostered"
                break;
            case 'adopt': adoption_status = "Adopted"
                break;
            default:
                throw new Error(`Error with adoption command: ${req.body.handler}`);
        }

        if (petObj._doc && adoption_status) {
            const updatedStatus = {
                ...petObj._doc,
                adoption_status,
                owner_id: req.body.owner_id
            };

            await petModel.changeStatusModel(updatedStatus, req.params.pet_id)

            res.status(200).send();
        } else {
            return res.status(404).send('Pet not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function myPets(req, res) {
    try {
        const myPets = await petModel.myPetsModel(req.body.userId)
        res.status(200).send(myPets)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function addFavorite(req, res) {
    try {
        await petModel.addFavoriteModel(req.body.userId, req.body.pet_id, req.body.isAdd)

        res.status(200).send();
    } catch (err) {
        res.status(500).send(err.message);
    }
}

async function favoritePets(req, res) {
    try {
        const favoritePets = await petModel.favoritePetsModel(req.body.favorite)
        res.status(200).send(favoritePets)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function addPet(req, res) {
    try {
        if (req.body.adoption_status == "Available") req.body.owner_id = ''
        req.body.dietary_restrictions = req.body.dietary_restrictions?.split(",")
        const { userId, ...pet } = req.body;
        const petWithLink = {
            ...pet,
            picture: req.file?.path ? req.file.path : 'https://res.cloudinary.com/dajehlqi8/image/upload/v1685047217/logo_ryqpb6.jpg',
        }
        const newPet = await petModel.addPetModel(petWithLink)
        res.status(201).send(newPet)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function putPet(req, res) {
    try {
        if (req.body.adoption_status == "Available") req.body.owner_id = ''
        req.body.dietary_restrictions = req.body.dietary_restrictions?.split(",")
        const { userId, ...pet } = req.body;
        const petWithLink = {
            ...pet,
            picture: req.file?.path ? req.file.path : req.body.picture ? req.body.picture : 'https://res.cloudinary.com/dajehlqi8/image/upload/v1685047217/logo_ryqpb6.jpg',
        }
        const { _id, ...updatedPet } = petWithLink;
        await petModel.putPetModel(_id, updatedPet)
        res.status(201).send(true)
    } catch (err) {
        res.status(500).send(err)
    }
}

async function getAllPets(req, res) {
    try {
        const pets = await petModel.getAllPetsModel();
        res.status(200).send(pets);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}


module.exports = { randomPets, searchPet, petGet, breedsGet, changeStatus, myPets, addFavorite, favoritePets, addPet, getAllPets, putPet }