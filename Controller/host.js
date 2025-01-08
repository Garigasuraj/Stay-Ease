const Host = require('../Models/loginSchema')

module.exports.login = (req,res,next)=>{
    res.render('hostLogin.ejs')
}

module.exports.hostAuthenticate = async(req,res,next)=>{
    req.flash("success","Login Successful")
    let defaultHomePage = res.locals.saveRedirectUrl || '/api/hostHome'
    res.redirect(defaultHomePage)
}

module.exports.signup = (req,res,next)=>{
    res.render('hostSignUp.ejs')
}

module.exports.register = async(req,res,next)=>{
    const role = process.env.HOST_KEY// need to change with hash or screct key
    const {username,email,password} = req.body.register
    const user = new Host({email,username,role})
    const registerUser = await Host.register(user,password)
    
    req.login(registerUser,(err)=>{
        if(err){
            return next(err)
        }
        req.flash("success","User successfully registered")
        res.redirect('/api/hostHome')
    })
}

module.exports.endSession = async(req,res,next)=>{
    req.logout(err =>{
        if(err){
            return next(err)
        }
    })
    req.flash("success","successfully logged out")
    res.redirect("/api/HostLoginPage")
}