const express = require('express')
const router = express.Router({mergeParams:true})
const multer  = require('multer')
const {cloudinary,storage} = require('../Cloudinary.js')
const upload = multer({ storage })
const asyncErrorHandler =  require('../util/AsyncErrorHandler.js')
const {isLoggedIn,validateUpdatedFormData,validateCreateFormData} = require('../middleware/userSession.js')
const {validate_deleted_listing} = require('../Controller/listing.js')
const controller = require('../Controller/listing.js')

router.get('/hostHome',isLoggedIn,asyncErrorHandler(controller.HosthomePage))

router.get('/home',isLoggedIn,asyncErrorHandler(controller.homePage))

// To read specific post (READ)
router.get('/specific_item/:id',isLoggedIn,validate_deleted_listing,asyncErrorHandler(controller.viewListing))

// To create a post (CREATE)
router.get('/createNew',isLoggedIn,controller.viewCreateListing)

router.post('/createPost',isLoggedIn,upload.single('create[image]'),asyncErrorHandler(controller.createPost))

// To edit the specific post (UPDATE)
router.get('/edit/:id',isLoggedIn, asyncErrorHandler(controller.viewUpdateListing))

router.patch('/update/:id',isLoggedIn, upload.single('update[image]'),validateUpdatedFormData,asyncErrorHandler(controller.updateListing))

// To perform delete operation (DELETE)
router.delete('/delete/:id',isLoggedIn, asyncErrorHandler(controller.deleteListing))

module.exports = router

