// const mongoose = require('../MongoDB/mongo.js')
const mongoose = require('mongoose')
const Review = require('./reviewSchema.js')
const user = require('./loginSchema.js')
const { string, required } = require('joi')
const { type } = require('os')

const listing_schema = mongoose.Schema({
    title:{
        type: String, required:[true,"title is required"]
    },
    description:{
        type: String, required:[true,"Description is required"]
    },
    image: {
        url: {type: String,required:[true ,"image is required"]}, 
        fileName: {type :String,
      required:[true ,"image name is required"]}
    },
    price:{
        type:Number,
        min:0,max:99999, required:[true,"price is required"]
    },
    location:{
        type:String,required:[true,"Location is required"]
    },
    country:{
        type:String,required:[true,"Country is required"]
    }, 
    reviews: [
        {type:mongoose.Schema.Types.ObjectId , ref:"customer_review"}
    ],
    listOwner: {
        type:mongoose.Schema.Types.ObjectId, ref:"auth"
    }
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