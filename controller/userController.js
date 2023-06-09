const userModel = require("../models/userModel")
const petModel = require("../models/petModel")
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
        const newUser = await userModel.addUserModel(req.body)
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
            const userObj = await userModel.findUserByIdModel(decoded.id)
            if (userObj) {
                const { password, ...postData } = userObj._doc;
                res.status(200).send(postData);
            } else {
                res.status(200).send(null);
            }
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
        const user = await userModel.findUserByIdModel(decoded.id)
        if (user) {
            const updatedUser = {
                name: req.body.name || user.name,
                lastname: req.body.lastname || user.lastname,
                phone: req.body.phone || user.phone,
                bio: req.body.bio,
                password: req.body.password || user.password,
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
async function getAllUsers(req, res) {
    try {
        const users = await userModel.getAllUsersModel();

        const modifiedUsers = await Promise.all(users.map(async (user) => {
            const { password, ...newUser } = user.toObject();
            const myPets = await petModel.myPetsModel(user._id)
            myPetsArray = myPets.map(animal => animal._id.toString())
            const ans = { ...newUser, myPetsArray }
            return ans;
        }))

        res.status(200).send(modifiedUsers);
    } catch (err) {
        console.log(err);
        res.status(500).send(err.message);
    }
}


async function changeAdmin(req, res) {
    try {
        const updatedUser = {
            isAdmin: req.body.isAdmin
        };
        await userModel.updateUserModel(updatedUser, req.body.id)

        res.status(200).send(true);

    } catch (err) {
        res.status(500).send(err.message);
    }
}


module.exports = { userLogin, changeUser, userSignUp, userGet, getAllUsers, changeAdmin }