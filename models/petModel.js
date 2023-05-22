const Pet = require('./Pet')


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



module.exports = { randomPetsModel, breedsGetModel, findPetByIdModel, searchPetModel, changeStatusModel, myPetsModel }