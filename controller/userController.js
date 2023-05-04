const userModel = require("../models/userModels")
const { v4: uuidv4 } = require('uuid')
const bcrypt = require('bcrypt');
const db = require('../knex/db')


async function userLogin(req, res) {
    try {
        const user = await userModel.findUserModel("email", req.body.email)
        const verifyUser = user && await bcrypt.compare(req.body.password, user.password)
        const { password, ...postData } = user;
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
        const isExist = await userModel.findUserModel("email", newUser.email)
        if (isExist) res.status(409).send()
        else {
            await userModel.addUserModel(newUser)
            res.status(201).send(newUser.id)
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function userGet(req, res) {
    try {
        const userObj = await userModel.findUserModel("id", req.body.id)
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
        const saltRounds = 10;
        const user = await userModel.findUserModel("id", req.body.id)

        if (user) {
            let password = user.password;
            if (req.body.password) {
                password = await bcrypt.hash(req.body.password, saltRounds);
            }

            const updatedUser = {
                name: name || user.name,
                lastname: lastname || user.lastname,
                phone: phone || user.phone,
                bio: bio || user.bio,
                password,
                email: email || user.email,
            };

            await userModel.updateUserModel(updatedUser, req.params.id)

            res.status(200).send();
        } else {
            res.status(404).send('User not found');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}


module.exports = { userLogin, changeUser, userSignUp, userGet }