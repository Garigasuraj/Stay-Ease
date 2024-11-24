const express = require('express');
const router = express.Router({mergeParams:true})
const ExpressError = require('../ErrorClass/errorClass.js')
const asyncErrorHandler =  require('../util/AsyncErrorHandler.js')
const airBnb = require("../Models/listingSchema.js")
const Review = require('../Models/reviewSchema.js')
const joiValidation = require('../serverValidation/joiValidation.js')

// Performing the child-parent relationship
router.post("/review/:id", asyncErrorHandler(async(req,res)=>{
    let {id} = req.params; let {review} = req.body
    let current_listing = await airBnb.findById(id)

    let data = new Review(review)

    current_listing.reviews.push(data)
    await current_listing.save()
    await data.save()
    await airBnb.findById(id).populate('reviews')

    req.flash("success","Successsfully Added the review")

    res.redirect(`/api/specific_item/${id}`)
}))
// Deleting the reviews
router.delete("/:id/review/:reviewId/delete",asyncErrorHandler(async(req,res)=>{
    let {id,reviewId} = req.params;
    await airBnb.findByIdAndUpdate( id, {$pull:{reviews:reviewId}})
    await Review.findByIdAndDelete(reviewId)
    req.flash("error","Review deleted")
    res.redirect(`/api/specific_item/${id}`)
}))

module.exports = router;