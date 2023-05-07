const bcrypt = require('bcrypt')
const { findUserModel } = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()


async function isNewUser(req, res, next) {
    const user = await findUserModel('email', req.body.email)
    if (user) {
        return res.status(409).send()
    }
    next()
}

function encryptPwd(req, res, next) {
    if (!req.body.password) return next()
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
            res.status(500).send(err.message)
        } else {
            req.body.password = hash
            next()
        }
    });
}

async function doesUserAndPwdExist(req, res, next) {
    try {
        const user = await findUserModel('email', req.body.email)
        const verifyUser = user && await bcrypt.compare(req.body.password, user.password)
        if (!verifyUser) {
            return res.status(401).send()
        }
        req.body.id = user.id
        next()

    } catch (err) {
        console.log(err)
        res.status(500).send(err.message)
    }
}

function auth(req, res, next) {
    if (!req.headers.authorization) {
        res.status(401).send("Missing token");
        return;
    }
    const token = req.headers.authorization.replace("Bearer ", "");
    jwt.verify(token, process.env.jwtSecret, (err, decoded) => {
        if (err) {
            res.status(401).send("Invalid Token");
            return;
        }
        if (decoded) {
            req.body.userId = decoded.id;
            next();
        }
    });
}



module.exports = {auth, isNewUser, encryptPwd, doesUserAndPwdExist }