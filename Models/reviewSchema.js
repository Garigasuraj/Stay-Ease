// const mongoose = require('../MongoDB/mongo.js')
const mongoose = require('mongoose')

const review_schema = mongoose.Schema({
    rating: {
        type:String, required:[true,"Rating is required!"]
    },
    description:{
        type: String, required:[true,"Description is required"]
    }

})

// defining model
const Review = mongoose.model("customer_review",review_schema)

module.exports = Review
