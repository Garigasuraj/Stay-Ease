const {createPostValidation} = require('../serverValidation/joiValidation.js');

module.exports.isUserLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        // use flash
        req.session.redirectUrl = req.originalUrl
        return res.redirect('/api/loginPage')
    }
    next()
}

module.exports.isHostLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        // use flash
        req.session.redirectUrl = req.originalUrl
        return res.redirect('/api/hostLoginPage')
    }
    next()
}

module.exports.redirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.saveRedirectUrl = req.session.redirectUrl
    }
    next()
}

module.exports.validateCreateFormData = (req,res,next)=>{
    const {error, value} = createPostValidation.validate(req.body.create)
    console.log(`JOI Error: ${error}`)
    if(error){ // CHECK
        let err = `Error updating data: ${error.details[0].message}`
        return res.render('flashMsgRender.ejs',{err});
    }
    next()
}

module.exports.validateUpdatedFormData = (req, res, next) => {
    const { error, value } = createPostValidation.validate(req.body.update)
    if (error) {
        // console.log(`JOI Error: ${error.details.map(err => err.message).join(", ")}`);
        let err = `Error updating data: ${error.details[0].message}`
        return res.render('flashMsgRender.ejs',{err});
    }
    next();
}

