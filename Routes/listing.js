const express = require('express');
const mongoose = require('mongoose')
const router = express.Router({mergeParams:true})
const ExpressError = require('../ErrorClass/errorClass.js')
const asyncErrorHandler =  require('../util/AsyncErrorHandler.js')
const airBnb = require("../Models/listingSchema.js")
const joiValidation = require('../serverValidation/joiValidation.js');

router.get('/home', asyncErrorHandler(async (req,res,next)=>{
    let listing_data = await airBnb.find({})
    res.render('home.ejs',{listing_data})
}))

// To read specific post (READ)
router.get('/specific_item/:id',asyncErrorHandler(async(req,res,next)=>{
    let {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        next(new ExpressError(500,"Invalid / Null response from Database"))
    }
    let listData = await airBnb.findById(id).populate('reviews')
    // console.log(listData)
    res.render('readListing.ejs',{listData})
}))

// To create a post (CREATE)
router.get('/createNew',(req,res,next)=>{
    res.render('createPost.ejs')
})

let validateCreateFormData = (req,res,next)=>{
    const {error, value} = joiValidation.validate(req.body.create)
    console.log(`JOI Error: ${error}`)
    if(error){
        let err = `Error updating data: ${error.details[0].message}`
        return res.render('flashMsgRender.ejs',{err});
    }
    next()
}

router.post('/createPost',validateCreateFormData, asyncErrorHandler(async(req,res,next)=>{
    let {create} = req.body
    let insert_data = new airBnb(create)
    let new_post = await insert_data.save() // saving the data
    if(new_post){
        req.flash("success","Successfully created post!!")
    }else{
        req.flash("error","Error creating post!!")
    }
    res.redirect("/api/home")
    } 
))

// To edit the specific post (UPDATE)
router.get('/edit/:id',asyncErrorHandler(async(req,res,next)=>{
    let {id} = req.params
    let data = await airBnb.findById(id)
    // console.log(data)
    res.render('editListing.ejs',{data})
}))

const validateUpdatedFormData = (req, res, next) => {
    const { error, value } = joiValidation.validate(req.body.update)
    if (error) {
        // console.log(`JOI Error: ${error.details.map(err => err.message).join(", ")}`);
        let err = `Error updating data: ${error.details[0].message}`
        return res.render('flashMsgRender.ejs',{err});
    }
    next();
};

router.patch('/update/:id',validateUpdatedFormData,asyncErrorHandler(async(req,res,next)=>{
    let {id} = req.params
    let {update} = req.body
  
    let post_update = await airBnb.findByIdAndUpdate(id,update,{new:true,runValidators:true})

    if(post_update){
        req.flash("success","Successfully updated the post!!")}
    res.redirect("/api/home")
}))

// To perform delete operation (DELETE)
router.delete('/delete/:id',asyncErrorHandler(async(req,res,next)=>{
    let {id} = req.params
    let post_delete = await airBnb.findByIdAndDelete(id,{new:true})
    if(post_delete){
        req.flash("error","Post deleted successfully!!")}
    res.redirect("/api/home")
}))

module.exports = router

