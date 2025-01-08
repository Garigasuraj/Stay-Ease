const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');
 
const authSchema = mongoose.Schema({
    username:{
        type: String, required:[true, "mail is required"],
        unique:true
    },
    role:{
        type:String, required:true
    }
})

authSchema.plugin(passportLocalMongoose);
// HostSchema.plugin(passportLocalMongoose,{usernameField: "hostEmail"})
// You're free to define your User how you like. Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

module.exports = mongoose.model('auth',authSchema)