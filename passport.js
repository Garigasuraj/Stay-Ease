const passport = require("passport");
const LocalStrategy = require("passport-local");
const User_login = require("./Models/loginSchema.js");

function configPassport() {
  passport.use(new LocalStrategy(User_login.authenticate()));
  
  //serializeUser and deserializeUser are methods that Passport uses to store user information in the session (serialize) 
  //and retrieve it on subsequent requests (deserialize).
  passport.serializeUser(User_login.serializeUser())
  passport.deserializeUser(User_login.deserializeUser())
}

module.exports = configPassport;
