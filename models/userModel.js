const db = require('../db/knex')


async function findUserModel(x, param) {
    try {
        return await db('users').where(x, param).first()
    } catch (err) {
        console.log(err)
    }
}

async function updateUserModel(updatedUser, id) {
    try {
        return await db('users').where('id', id).update(updatedUser);
    } catch (err) {
        console.log(err)
    }
}

async function addUserModel(newUser) {
    try {
        return await db('users').insert(newUser);
    } catch (err) {
        console.log(err)
    }
}


module.exports = { findUserModel, updateUserModel,addUserModel }