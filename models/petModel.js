const Pet = require('./Pet')
const User = require('./User')


async function findPetByIdModel(id) {
    try {
        const pet = await Pet.findById(id)
        return pet
    } catch (err) {
        console.log(err)
    }
}

async function searchPetModel(searchObj) {
    try {
        const { type, name, height, weight, breed, status } = searchObj;
        const query = Pet.find({
            type,
            name: { $regex: name, $options: "i" },
            height: { $gte: height[0], $lte: height[1] },
            weight: { $gte: weight[0], $lte: weight[1] },
            adoption_status: { $ne: "Adopted" }
        });

        if (breed) {
            query.where("breed").in(breed);
        }

        if (status !== "All") {
            query.where("adoption_status", status);
        }

        return await query.exec();
    } catch (err) {
        console.log(err);
    }
}

async function myPetsModel(userId) {
    try {
        const query = Pet.find({
            owner_id: userId
        });
        return await query.exec();
    } catch (err) {
        console.log(err);
    }
}

async function favoritePetsModel(favorite) {
    try {
        const query = Pet.find({ '_id': { $in: favorite }, 'adoption_status': { $ne: "Adopted" } });
        return await query.exec();
    } catch (err) {
        console.log(err);
    }
}

async function breedsGetModel(type) {
    try {
        const uniqueBreeds = await Pet.distinct("breed").where("type", type).exec();
        return uniqueBreeds;
    } catch (err) {
        console.log(err);
    }
}


async function randomPetsModel() {
    try {
        const pets = await Pet.aggregate([
            { $match: { adoption_status: { $ne: "Adopted" } } },
            { $sample: { size: 10 } }
        ]).exec();
        return pets;
    } catch (err) {
        console.log(err);
    }
}



async function changeStatusModel(updatedStatus, id) {
    try {
        const result = await Pet.updateOne({ _id: id }, updatedStatus);
        return result;
    } catch (err) {
        console.log(err);
    }
}

async function addFavoriteModel(user_id, pet_id, isAdd) {
    try {
        if (isAdd) {
            await Pet.updateOne({ _id: pet_id }, { $push: { favorite: user_id } })
            await User.updateOne({ _id: user_id }, { $push: { favorite: pet_id } })
        }
        else {
            await Pet.updateOne({ _id: pet_id }, { $pull: { favorite: user_id } })
            await User.updateOne({ _id: user_id }, { $pull: { favorite: pet_id } })
        }
        return
    } catch (err) {
        console.log(err);
    }
}

async function addPetModel(newPet) {
    try {
        const pet = await Pet.create(newPet)
        return pet
    } catch (err) {
        console.log(err)
        return null
    }
}

async function putPetModel(id, updatedPet) {
    try {
        const result = await Pet.findOneAndUpdate({ _id: id }, updatedPet);
        return result;
    } catch (err) {
        console.log(err)
    }
}


const backupData = require('D:/My/ITC/Projects/Pet Adoption/my files/pets.json');
async function getAllPetsModel() {
    try {
        backupData.forEach(async (backupItem) => {
            await Pet.updateOne({ _id: backupItem._id.$oid }, { $set: { breed: backupItem.breed } });
        });
        const pets = await Pet.find({})
        return pets
    } catch (err) {
        console.log(err)
    }
}



module.exports = { randomPetsModel, breedsGetModel, findPetByIdModel, searchPetModel, changeStatusModel, myPetsModel, addFavoriteModel, favoritePetsModel, addPetModel, getAllPetsModel, putPetModel }