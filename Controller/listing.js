const mongoose = require('mongoose')
const airBnb = require("../Models/listingSchema")

module.exports.homePage = async (req,res,next)=>{
    let listing_data = await airBnb.find({})
    res.render('home.ejs',{listing_data})
}

module.exports.viewListing = async(req,res,next)=>{
    const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose"];
     const randomCity = cities[Math.floor(Math.random() * cities.length)];

    let {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)){
        next(new ExpressError(500,"Invalid / Null response from Database"))
    }
    let listData = await airBnb.findById(id).populate('reviews').populate('listOwner')
    let role_id = req.user.role
    res.render('readListing.ejs',{listData,role_id,randomCity})
}

module.exports.viewCreateListing = (req,res,next)=>{
    res.render('createPost.ejs')
}

module.exports.createPost = async(req,res,next)=>{

    const path = req.file.path; 
    const filename = req.file.filename

    let {create} = req.body
    let insert_data = new airBnb(create)
    insert_data.image = {url: path, fileName: filename}
    insert_data.listOwner = req.user._id
    let new_post = await insert_data.save() // saving the data
    if(new_post){
        req.flash("success","Successfully created post!!")
    }else{
        req.flash("error","Error creating post!!")
    }
    res.redirect("/api/hostHome")
} 

module.exports.validate_deleted_listing = (async(req,res,next)=>{
    let {id} = req.params
    let list_data = await airBnb.findById(id)
    if(!mongoose.Types.ObjectId.isValid(id)){
        next(new ExpressError(500,"Invalid Id"))
    }
    if(!list_data){
        req.flash("error","The post you are looking for got deleted!!") 
        return res.redirect('/api/hostHome')
    }
    next()
})

module.exports.viewUpdateListing = async(req,res,next)=>{
    let {id} = req.params
    let data = await airBnb.findById(id)
    res.render('editListing.ejs',{data})
}

module.exports.updateListing = async(req,res,next)=>{
    let {id} = req.params; const {update} = req.body
    let new_post = await airBnb.findByIdAndUpdate(id,update,{runValidators:true,new:true})

    // console.log(new_post)

    // console.log(res.locals.userlogin._id)

    // if(!new_post.listOwner.equals(res.locals.userlogin._id)){
    //     req.flash("error","Only authorized user can update the listing!!")
    //     return res.redirect(`/api/edit/${id}`)
    // }

    if(req.file){
        console.log(req.file)
        const url = req.file.path; 
        const filename = req.file.filename;
       new_post.image = {url:url, fileName: filename}
       await new_post.save()
    }
    if(new_post){
        req.flash("success","Successfully updated the post!!")}
    res.redirect("/api/HostHome")
}

module.exports.deleteListing = async(req,res,next)=>{
    let {id} = req.params
    let del_post = await airBnb.findByIdAndUpdate(id)
    if(del_post && !del_post.listOwner.equals(res.locals.userlogin._id)){
        req.flash("error","Only authorized user can delete the listing!!")
        return res.redirect(`/api/specific_item/${id}`)
    }
    let post_delete = await airBnb.findByIdAndDelete(id,{new:true})
    if(post_delete){
        req.flash("error","Post deleted successfully!!")}
    res.redirect("/api/Hosthome")
}