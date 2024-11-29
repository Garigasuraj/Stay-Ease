const express = require('express');
const router = express.Router({mergeParams:true})
const ExpressError = require('../ErrorClass/errorClass.js')
const asyncErrorHandler =  require('../util/AsyncErrorHandler.js')
const airBnb = require("../Models/listingSchema.js")
const {userLoginValidation} = require('../serverValidation/joiValidation.js');
const User = require('../Models/loginSchema.js')
const { ne } = require('@faker-js/faker');
const passport = require('passport')

let validate_login = ((req,res,next)=>{
    let {login} = req.body
    console.log("validation",login)
    let {error,value} = userLoginValidation.validate(req.body.login)
    console.log(error)
    if(error){
        const err = `${error.details[0].message}`
        req.flash("login",err)
        res.redirect("/api/loginPage")
    }
    next()
})

router.get('/loginPage',((req,res,next)=>{
    res.render('login.ejs')
}))

router.post('/userLogin/signIn',passport.authenticate('local',{failureRedirect:'/api/loginPage',failureFlash:true}) ,async(req,res,next)=>{
    req.flash("success","Login Successful")
    res.redirect("/api/home")
})

router.get('/register/user',(req,res,next)=>{
    res.render('signUp.ejs')
})

router.post('/usersignup',asyncErrorHandler(async(req,res,next)=>{
    const {username,email,password} = req.body.register
    const user = new User({email,username})
    const registerUser = await User.register(user,password)

    req.flash("success","User successfully registered")
    console.log(registerUser)
    res.redirect('/api/loginPage')
}))

module.exports = router