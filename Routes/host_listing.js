const express = require('express');
const router = express.Router({mergeParams:true})
const asyncErrorHandler =  require('../util/AsyncErrorHandler.js')
const {redirectUrl,isHostLoggedIn} = require('../middleware/userSession.js')
const controller = require('../Controller/Host_listing.js')

router.get('/hostHome',isHostLoggedIn,asyncErrorHandler(controller.HosthomePage))

module.exports = router