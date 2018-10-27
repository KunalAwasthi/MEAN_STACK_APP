var express = require('express');
var router = express.Router();

//controllers
var ctrlLocations = require('../controllers/locations');
var ctrlReviews   = require('../controllers/review');

/**
 * location routes 
*/
router.get('/locations',ctrlLocations.locationListByDistance);
router.get('/locations/:locationid',ctrlLocations.ServeOneLocation);
router.post('/locations',ctrlLocations.saveLocation);
router.put('/locations/:locationid',ctrlLocations.updateLocation);
router.delete('/locations/:locationid',ctrlLocations.deleteLocation);
/**
 * location reviews 
*/
router.post('/locations/:locationid/reviews',ctrlReviews.saveReview);
router.get('/locations/:locationid/reviews/:reviewid',ctrlReviews.readOne);
router.put('/locations/:locationid/reviews/:reviewid',ctrlReviews.updateReview);
router.delete('/locations/:locationid/reviews/:reviewid',ctrlReviews.deleteReview);

module.exports = router;