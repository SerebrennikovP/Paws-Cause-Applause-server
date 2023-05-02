const userModel = require("../models/userModels")
const { v4: uuidv4 } = require('uuid')

async function userLogin(req, res) {
    try {
        const data = userModel.getAllUsersModel()
        const parsedData = JSON.parse(data)
        const userObj = parsedData.find(({ email }) => email == req.body.email)
        userObj && userObj.password === req.body.password ? res.status(201).send(userObj) : res.status(401).send()
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
        res.status(200).send(userObj)
    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

async function changeUser(req, res) {
    try {
        const { name, lastname, email, phone } = req.body;
        const allPosts = await getAllPostsModel()
  
        const updatedUser = {
           ...commentToUpdate.data,
           name: name || commentToUpdate.data.name,
           lastname: lastname || commentToUpdate.data.name,
           email: email || commentToUpdate.data.email,
           phone: phone || commentToUpdate.data.body,
        };
        const foundedUser = allPosts[req.params.id].comments.find(comment => comment.id == req.params.commentID);
        Object.assign(foundedUser, updatedUser);
        addPostsModel(allPosts)
        res.send(updatedComment);
     } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
     }
}


module.exports = { userLogin, changeUser, userSignUp, userGet }