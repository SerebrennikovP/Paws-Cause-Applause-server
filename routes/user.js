const express = require('express')
const router = express.Router()
const { userLogin, userSignUp, userGet, changeUser } = require('../controller/userController')

const { isNewUser, encryptPwd, doesUserAndPwdExist,auth } = require('../middleware/userMiddleware')


router.post('/signup', isNewUser, encryptPwd, userSignUp)

router.post('/login', doesUserAndPwdExist, userLogin)

router.post('/getUser', userGet)

router.put('/changeUser/:token',auth, encryptPwd, changeUser)


module.exports = router