const userModel = require("../models/userModel")
const { v4: uuidv4 } = require('uuid')
const jwt = require('jsonwebtoken')
require('dotenv').config()

async function userLogin(req, res) {
    try {
        const token = jwt.sign({ id: req.body.id }, process.env.jwtSecret, { expiresIn: '1d' })
        const expirationDate = Date.now() + 24 * 60 * 60 * 1000 // 1 Day
        res.status(201).send({ token, expirationDate })
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function userSignUp(req, res) {
    try {
        const newUser = {
            ...req.body,
            id: uuidv4(),
        };
        await userModel.addUserModel(newUser)
        const token = jwt.sign({ id: newUser.id }, process.env.jwtSecret, { expiresIn: '1d' })
        const expirationDate = Date.now() + 24 * 60 * 60 * 1000 // 1 Day
        res.status(201).send({ token, expirationDate })
    } catch (err) {
        console.log(err)
        res.status(500).send('Invalid token')
    }
}

async function userGet(req, res) {
    try {
        if (req.body.token) {
            const decoded = jwt.verify(req.body.token, process.env.jwtSecret);
            const userObj = await userModel.findUserModel("id", decoded.id)
            userObj ? { password, ...postData } = userObj : postData = null;
            res.status(200).send(postData)
        } else
            res.status(200).send()
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function changeUser(req, res) {
    try {
        const decoded = jwt.verify(req.params.token, process.env.jwtSecret);
        const user = await userModel.findUserModel('id', decoded.id)

        if (user) {
            const updatedUser = {
                name: req.body.name || user.name,
                lastname: req.body.lastname || user.lastname,
                phone: req.body.phone || user.phone,
                bio: req.body.bio || user.bio,
                password: req.body.password || user.pasword,
                email: req.body.email || user.email,
            };

            await userModel.updateUserModel(updatedUser, decoded.id)

            res.status(200).send();
        } else {
            return res.status(404).send('User not found');
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = { userLogin, changeUser, userSignUp, userGet }