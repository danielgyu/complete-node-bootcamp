const express = require('express');

const tourController = require('../controllers/tourControllers.js');
const authController = require('../controllers/authControllers.js');

// router init
const router = express.Router();

// middleware
/*
router.param('id', tourController.checkID);
*/

// routers
router
    .route('/')
    .get(authController.protect, tourController.getAllTours)
    .post(tourController.postTour);

router
    .route('/top-5-cheapest')
    .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router
    .route('/:id')
    .get(tourController.getTour)
    .patch(tourController.patchTour)
    .delete(tourController.deleteTour);

module.exports = router;
