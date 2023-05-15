const bcrypt = require('bcrypt')
const { findUserModel } = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Joi = require('joi');

function checkSchema(req, res, next) {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
        name: Joi.string().required(),
        lastname: Joi.string().required(),
        phone: Joi.string().regex(/^\+?[1-9]\d{9,19}$/).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    } else {
        next();
    }
}

function checkSchemaForPut(req, res, next) {
    const schema = Joi.object().keys({
        email: Joi.string().email(),
        password: Joi.string().min(8),
        name: Joi.string(),
        lastname: Joi.string(),
        phone: Joi.string().regex(/^\+?[1-9]\d{9,19}$/),
        id: Joi.string(),
        bio: Joi.string(),
        favorite: Joi.string().allow(null)
    });
    console.log(req.body)
    const { error } = schema.validate(req.body);
    if (error) {
        console.log(error.details[0].message)
        res.status(400).json({ message: error.details[0].message });
    } else {
        next();
    }
}

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



module.exports = { checkSchemaForPut, checkSchema, auth, isNewUser, encryptPwd, doesUserAndPwdExist }