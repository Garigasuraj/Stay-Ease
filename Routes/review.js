const express = require('express');
const router = express.Router({mergeParams:true})
const asyncErrorHandler =  require('../util/AsyncErrorHandler.js')
const controller = require('../Controller/review.js')

// Performing the child-parent relationship
router.post("/review/:id", asyncErrorHandler(controller.createReview))
// Deleting the reviews
router.delete("/:id/review/:reviewId/delete",asyncErrorHandler(controller.deleteReview))

module.exports = router;