// const mongoose = require('../MongoDB/mongo.js')
const mongoose = require('mongoose')
const Review = require('./reviewSchema.js')

const listing_schema = mongoose.Schema({
    title:{
        type: String, required:[true,"title is required"]
    },
    description:{type: String, required:[true,"Description is required"]},
    image: {
        type: String,
        set: (v => v ? v: "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHNreSUyMHZhY2F0aW9ufGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60")
    },
    price:{
        type:Number,
        min:0,max:99999, required:[true,"price is required"]
    },
    location:{type:String,required:[true,"Location is required"]},
    country:{type:String,required:[true,"Country is required"]}, 
    reviews: [{type:mongoose.Schema.Types.ObjectId , ref:"customer_review"}]
})

listing_schema.post('findOneAndDelete', async(doc,next)=>{
    try {
        if(doc && doc.rviews && doc.reviews.length > 0){
            //  if my id are in doc.reviews array.
            await Review.deleteMany({_id:{$in:doc.reviews}})
        }
        next()
    } catch (error) {
        console.log(error)
        next(error)
    }
})

// defining the model
const airBnb = mongoose.model("airBnb",listing_schema)

module.exports = airBnb