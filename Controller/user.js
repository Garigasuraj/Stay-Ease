const User = require('../Models/loginSchema.js')

module.exports.login = (req,res,next)=>{
    res.render('login.ejs')
}

module.exports.authenticate = async(req,res,next)=>{
    req.flash("success","Login Successful")
    let defaultHomePage = res.locals.saveRedirectUrl || '/api/home'
    res.redirect(defaultHomePage)
}

module.exports.signup = (req,res,next)=>{
    res.render('signUp.ejs')
}

module.exports.register = async(req,res,next)=>{
    const {username,email,password} = req.body.register
    const user = new User({email,username})
    const registerUser = await User.register(user,password)
    
    req.login(registerUser,(err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","User successfully registered")
        console.log(registerUser)
        res.redirect('/api/home')
    })
}

module.exports.endSession = async(req,res,next)=>{
    req.logout(err =>{
        if(err){
            return next(err)
        }
    })
    req.flash("success","successfully logged out")
    res.redirect("/api/loginPage")
}