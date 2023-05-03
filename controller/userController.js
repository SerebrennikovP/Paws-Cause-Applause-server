const userModel = require("../models/userModels")
const { v4: uuidv4 } = require('uuid')
const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

async function userLogin(req, res) {
    try {
        const data = await userModel.getAllUsersModel()
        const parsedData = JSON.parse(data)
        const userObj = parsedData.find(({ email }) => email === req.body.email)
        const verifyUser = userObj && await bcrypt.compare(req.body.password, userObj.password)
        const { password, ...postData } = userObj;
        res.status(verifyUser ? 201 : 401).send(verifyUser ? postData : null)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function userSignUp(req, res) {
    const saltRounds = 10;
    try {
        const password = await bcrypt.hash(req.body.password, saltRounds)
        const newUser = {
            ...req.body,
            password,
            id: uuidv4(),
        };
        const isOK = userModel.addUserModel(newUser)
        isOK ? res.status(201).send(newUser.id) : res.status(409).send()
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function userGet(req, res) {
    try {
        const userObj = userModel.getUserModel(req.body)
        userObj ? { password, ...postData } = userObj : postData = null;
        res.status(200).send(postData)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function changeUser(req, res) {
    try {
        const { name, lastname, phone, bio, email } = req.body;
        const data = userModel.getAllUsersModel()
        const parsedData = JSON.parse(data)
        const saltRounds = 10;
        const userIndex = parsedData.findIndex(user => user.id == req.params.id);
        let password
        req.body.password ? password = await bcrypt.hash(req.body.password, saltRounds) : password = parsedData[userIndex].password

        if (userIndex !== -1) {
            const updatedUser = {
                ...parsedData[userIndex],
                name: name || parsedData[userIndex].name,
                lastname: lastname || parsedData[userIndex].lastname,
                phone: phone || parsedData[userIndex].phone,
                bio: bio || parsedData[userIndex].bio,
                password,
                email: email || parsedData[userIndex].email,
            };
            parsedData[userIndex] = updatedUser;

            const usersFilePath = path.join(__dirname, '..', 'db', 'users.json');
            fs.writeFileSync(usersFilePath, JSON.stringify(parsedData));
            res.status(200).send()
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}


module.exports = { userLogin, changeUser, userSignUp, userGet }