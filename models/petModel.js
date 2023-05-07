const db = require('../db/knex')


async function findPetModel(x, param) {
    try {
        return await db.from('pets').where(x, param).first()
    } catch (err) {
        console.log(err)
    }
}

// async function updatePetModel(updatedPet, id) {
//     try {
//         return await db('pets').where('id', id).update(updatedPet);
//     } catch (err) {
//         console.log(err)
//     }
// }

// async function addUserModel(newUser) {
//     try {
//         return await db('users').insert(newUser);
//     } catch (err) {
//         console.log(err)
//     }
// }


module.exports = { findPetModel }