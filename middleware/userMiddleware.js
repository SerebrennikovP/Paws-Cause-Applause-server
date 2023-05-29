const bcrypt = require('bcrypt')
const { findUserByEmailModel, findUserByIdModel } = require('../models/userModel')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Joi = require('joi');
const IDs_creators = ["646e147c7c8a09352a0c6170"]

function checkSchema(req, res, next) {
    const schema = Joi.object().keys({
        email: Joi.string().email({ tlds: { allow: false } }).required(),
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
        email: Joi.string().email({ tlds: { allow: false } }),
        password: Joi.string().min(8),
        name: Joi.string(),
        lastname: Joi.string(),
        phone: Joi.string().regex(/^\+?[1-9]\d{9,19}$/),
        _id: Joi.string(),
        bio: Joi.string().allow(""),
        favorite: Joi.array().allow(null),
        isAdmin: Joi.boolean(),
        date: Joi.date(),
        __v: Joi.number()
    });

    const { error } = schema.validate(req.body);
    if (error) {
        res.status(400).json({ message: error.details[0].message });
    } else {
        next();
    }
}


async function isNewUser(req, res, next) {
    const user = await findUserByEmailModel(req.body.email)
    if (user) {
        return res.status(409).send('User with this email exist')
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
        const user = await findUserByEmailModel(req.body.email)
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

async function isAdmin(req, res, next) {
    const user = await findUserByIdModel(req.body.userId)
    if (!user.isAdmin)
        return res.status(401).send("It isn't admin")
    next()
}

function isCreator(req, res, next) {
    if (!IDs_creators.includes(req.body.userId))
        return res.status(401).send("Only creator can change the list of admins")
    next()
}


module.exports = { checkSchemaForPut, checkSchema, auth, isNewUser, encryptPwd, doesUserAndPwdExist, isAdmin, isCreator }