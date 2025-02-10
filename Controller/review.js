const airBnb = require("../Models/listingSchema.js")
const Review = require('../Models/reviewSchema.js')

module.exports.createReview = async(req,res)=>{
    let {id} = req.params; let {review} = req.body
    let current_listing = await airBnb.findById(id)

    let data = new Review(review)
    data.name = req.user.username
    
    current_listing.reviews.push(data)
    await current_listing.save()
    await data.save()
    await airBnb.findById(id).populate('reviews')

    req.flash("success","Successsfully Added the review")

    res.redirect(`/api/specific_item/${id}`)
}

module.exports.deleteReview = async(req,res)=>{
    let {id,reviewId} = req.params;
    await airBnb.findByIdAndUpdate( id, {$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("error","Review deleted")
    res.redirect(`/api/specific_item/${id}`)
}