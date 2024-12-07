const express = require('express');
const router = express.Router({mergeParams:true})
const asyncErrorHandler =  require('../util/AsyncErrorHandler.js')
const passport = require('passport')
const {redirectUrl} = require('../middleware/userSession.js')
const controller = require('../Controller/user.js')

// handling the user signI
router.get('/loginPage',(controller.login))

router.post('/userLogin/signIn',
    redirectUrl,
    passport.authenticate('local',{failureRedirect:'/api/loginPage',failureFlash:true}),
    asyncErrorHandler(controller.authenticate))

// handling the user signUp
router.get('/register/user',controller.signup)

router.post('/usersignup',asyncErrorHandler(controller.register))

// To end user session
router.get('/endSession',(controller.endSession))
module.exports = router