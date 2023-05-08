const express = require('express')
const router = express.Router()
const { userLogin, userSignUp, userGet, changeUser } = require('../controller/userController')

const { checkSchemaForPut, checkSchema, isNewUser, encryptPwd, doesUserAndPwdExist, auth } = require('../middleware/userMiddleware')


router.post('/signup', checkSchema, isNewUser, encryptPwd, userSignUp)

router.post('/login', doesUserAndPwdExist, userLogin)

router.post('/getUser', userGet)

router.put('/changeUser/:token', checkSchemaForPut, auth, encryptPwd, changeUser)


module.exports = router