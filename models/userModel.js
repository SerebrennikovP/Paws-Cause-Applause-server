const User = require('./User')

async function findUserByEmailModel(email) {
    try {
        const user = await User.findOne({ email })
        return user
    } catch (err) {
        console.log(err)
    }
}

async function findUserByIdModel(id) {
    try {
        const user = await User.findById(id)
        return user
    } catch (err) {
        console.log(err)
    }
}

async function updateUserModel(updatedUser, id) {
    try {
        const result = await User.findOneAndUpdate({ _id: id }, updatedUser);
        return result;
    } catch (err) {
        console.log(err);
    }
}


async function addUserModel(newUser) {
    try {
        const user = await User.create(newUser)
        return user
    } catch (err) {
        console.log(err)
    }
}


module.exports = { findUserByIdModel, findUserByEmailModel, updateUserModel, addUserModel }