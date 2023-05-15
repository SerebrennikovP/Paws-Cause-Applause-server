const petModel = require("../models/petModel")

async function petGet(req, res) {
    try {
        const petObj = await petModel.findPetModel("pet_id", req.params.pet_id)
        petObj.dietary_restrictions = Object.entries(JSON.parse(petObj.dietary_restrictions))
            .filter(([key, value]) => !value)
            .map(([key, value]) => key).join(', ').toUpperCase()
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
        const petObj = await petModel.findPetModel("pet_id", req.params.pet_id)
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

        if (petObj && adoption_status) {
            const updatedStatus = {
                ...petObj,
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

module.exports = { randomPets, searchPet, petGet, breedsGet, changeStatus }