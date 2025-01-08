if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const path = require('path')
const mongoose_connection = require('./MongoDB/mongo.js')
const session = require('express-session')
const flash =  require('connect-flash')
const method_override = require('method-override');
const ejsMate = require('ejs-mate')
const CustomError = require('./util/CustomError.js')

const passport = require('passport')
const configPassport = require('./passport.js')

const userLogin = require('./Routes/login.js')
const listing = require('./Routes/listing.js')
const review = require('./Routes/review.js')
const hostLogin = require('./Routes/host.js')
// const SQL_connection = require('./SQL/SQLServer.js')

app.use(method_override('_method'))

// Middlewear for parsing incomming body request
app.use(express.urlencoded({extended:true}))
app.use(express.json())

// For serving static files from Boorstrap
app.use('/bootstrap-icons',express.static(path.join(__dirname,'node_modules/bootstrap-icons')))
app.use('/bootstrap',express.static(path.join(__dirname,'node_modules/bootstrap/dist')))

app.engine('ejs',ejsMate)
// EJS Template response 
//app.set is used for set application level configuration
app.set('view engine','ejs')

// use this for multiple views 
app.set('views',[
    path.join(__dirname,"Ejs_template/Login"),
    path.join(__dirname,"Ejs_template"),
    path.join(__dirname,"Ejs_template/Listing"),
    path.join(__dirname,"Ejs_template/Host")
])

// middlewear for serving static files
app.use(express.static(path.join(__dirname,'Public/javascript')))
app.use(express.static(path.join(__dirname,'Public/Styles')))
app.use(express.static(path.join(__dirname,'Public/images')))

mongoose_connection()

const expressSession = {
    secret: "secretkey",
    resave: false, saveUninitialized: true,
    expires: Date.now() + 7*40*60*60*1000,
    Maxage: 7*24*60*60*1000,
    httpOnly: true
}

app.use(session(expressSession))
app.use(flash())

// implementing the user auth
app.use(passport.initialize());
app.use(passport.session());

configPassport()

// Middleware to show flash messages
app.use((req,res,next)=>{
    res.locals.success = req.flash("success")
    res.locals.error = req.flash("error")

    res.locals.login = req.flash("login")
    res.locals.userlogin =  req.user

    next()
    
})
//======================================

// route handler for home pagae
app.use('/api',listing)
// route handler for review
app.use('/api',review)

app.use('/api',userLogin)

app.use('/api',hostLogin)

// Global Custom Error middlewear
app.use(CustomError)

// For invaild route
app.all('*',(req,res)=>{
    res.send('<h1> Page Not Found </h1>')
})

const port = 4000
// starting port
app.listen(port,()=>{
    console.log(`Server Has Started with port: ${port} `)
})