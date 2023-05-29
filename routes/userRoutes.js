const express = require('express')
const router = express.Router()
const { userLogin, userSignUp, userGet, changeUser, getAllUsers, changeAdmin } = require('../controller/userController')

const { checkSchemaForPut, checkSchema, isNewUser, isNewEmail, encryptPwd, doesUserAndPwdExist, auth, isCreator, isAdmin } = require('../middleware/userMiddleware')


router.post('/signup', checkSchema, isNewUser, encryptPwd, userSignUp)

router.post('/login', doesUserAndPwdExist, userLogin)

router.post('/getUser', userGet)

router.put('/changeUser/:token', checkSchemaForPut, auth, isNewEmail, encryptPwd, changeUser)

router.get('/getAllUsers', auth, isAdmin, getAllUsers)

router.put('/changeAdmin', auth, isCreator, changeAdmin)


module.exports = router