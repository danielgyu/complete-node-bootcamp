const express = require('express');
const fs = require('fs');

const tourController = require('./../controllers/tourControllers.js');

// router init
const router = express.Router();

// middleware
router.param('id', tourController.checkID);

// routers
router
    .route('/')
    .get(tourController.getAllTours)
    .post(tourController.checkBody, tourController.postTour);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.patchTour)
    .delete(tourController.deleteTour);

module.exports = router;
