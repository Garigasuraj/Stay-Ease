const express = require('express');
const router = express.Router({mergeParams:true})
const asyncErrorHandler =  require('../util/AsyncErrorHandler.js')
const passport = require('passport')
const {redirectUrl} = require('../middleware/userSession.js')
const controller = require('../Controller/user.js')

// handling the user signI
router.get('/loginPage',(controller.login))
.post('/loginPage',
    redirectUrl,
    passport.authenticate('local',{failureRedirect:'/api/loginPage',failureFlash:true}), (req,res,next)=>{
        if(req.user.role !== process.env.CUSTOMER_KEY){
            req.flash("error","Invalid User login ")
            return res.redirect('/api/loginPage')
        }
        next()
    },
    asyncErrorHandler(controller.authenticate))

// handling the user signUp
router.get('/register/user',controller.signup)

router.post('/usersignup',asyncErrorHandler(controller.register))

// To end user session
router.get('/endSession',(controller.endSession))
module.exports = router