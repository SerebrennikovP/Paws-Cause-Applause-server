const db = require('../db/knex')


async function findPetModel(x, param) {
    try {
        return await db.from('pets').where(x, param).first()
    } catch (err) {
        console.log(err)
    }
}

async function searchPetModel(searchObj) {
    try {
        const { type, name, height, weight, breed, status } = searchObj;
        const query = db('pets')
            .where('type', type)
            .where('name', 'like', `%${name}%`)
            .whereBetween('height', height)
            .whereBetween('weight', weight)
            .whereNot('adoption_status', 'Adopted')

        if (breed) {
            query.whereIn('breed', breed);
        }

        if (status != "All") {
            query.where('adoption_status', status);
        }

        return await query;
    } catch (err) {
        console.log(err);
    }
}

async function breedsGetModel(type) {
    try {
        return await db('pets')
            .distinct('breed')
            .where('type', type)
            .pluck('breed');
    } catch (err) {
        console.log(err)
    }
}

async function randomPetsModel() {
    try {
        return db.select('*').from('pets').whereNot('adoption_status', 'Adopted').orderByRaw('RAND()').limit(10)
    } catch (err) {
        console.log(err)
    }
}

async function changeStatusModel(updatedStatus, id) {
    try {
        return await db('pets').where('pet_id', id).update(updatedStatus);
    } catch (err) {
        console.log(err)
    }
}


module.exports = { randomPetsModel, breedsGetModel, findPetModel, searchPetModel, changeStatusModel }