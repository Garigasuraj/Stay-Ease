const express = require('express');
const router = express.Router({mergeParams:true})
const asyncErrorHandler =  require('../util/AsyncErrorHandler.js')
const passport = require('passport')
const {redirectUrl} = require('../middleware/userSession.js')
const controller = require('../Controller/host.js')

// handling the user signIn
router.get('/hostLoginPage',(controller.login))

router.post('/userLogin/hostLogin',
    redirectUrl,
    passport.authenticate('local',{failureRedirect:'/api/hostLoginPage',failureFlash:true}),(req,res,next)=>{
        if (req.user.role !== process.env.HOST_KEY) {
            req.flash("error", "Invalid host login!");
            return res.redirect("/api/hostLoginPage");
        }
        next()
    },
    asyncErrorHandler(controller.hostAuthenticate))

// handling the user signUp
router.get('/register/hostSignUp',controller.signup)

router.post('/hostSignUp',asyncErrorHandler(controller.register))

// To end user session
router.get('/endSession',(controller.endSession))

module.exports = router