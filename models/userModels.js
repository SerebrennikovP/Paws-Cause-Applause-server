const fs = require('fs');
const path = require('path');

const pathToUsersObjects = path.resolve(__dirname, '../db/users.json')

function getAllUsersModel() {
    try {
        const users = fs.readFileSync(pathToUsersObjects, 'utf-8')
        return users
    } catch (err) {
        console.log(err)
    }
}

function addUserModel(newUser) {
    try {
        const data = getAllUsersModel()
        const parsedData = JSON.parse(data)
        if (parsedData.find(({ email }) => email == newUser.email)) return false
        else {
            parsedData.push(newUser)
            fs.writeFileSync(pathToUsersObjects, JSON.stringify(parsedData))
            return true
        }
    } catch (err) {
        console.log(err)
    }
}




module.exports = { getAllUsersModel, addUserModel }