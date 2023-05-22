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


module.exports = { randomPets, searchPet, petGet, breedsGet, changeStatus, myPets }