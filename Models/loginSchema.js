const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const loginSchema = mongoose.Schema({
    email:{
        type: String, required:[true, "Email is required"]
    }
})

loginSchema.plugin(passportLocalMongoose);
// loginSchema.plugin(passportLocalMongoose,{usernameField: "email"})
// You're free to define your User how you like. Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.

module.exports = mongoose.model('user',loginSchema)