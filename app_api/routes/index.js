var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret:process.env.JWT_SECRET,
    userProperty:'payload'
});

//controllers
var ctrlLocations = require('../controllers/locations');
var ctrlReviews   = require('../controllers/review');
var ctrlAuth      = require('../controllers/Auth'); 
/**
 * location routes 
*/
router.get('/locations',auth,ctrlLocations.locationListByDistance);
router.get('/locations/:locationid',auth,ctrlLocations.ServeOneLocation);
router.post('/locations',auth,ctrlLocations.saveLocation);
router.put('/locations/:locationid',auth,ctrlLocations.updateLocation);
router.delete('/locations/:locationid',auth,ctrlLocations.deleteLocation);
/**
 * location reviews 
*/
router.get('/locations/:locationid/reviews/:reviewid',auth,ctrlReviews.readOne); //read
router.post('/locations/:locationid/reviews',auth,ctrlReviews.saveReview); //create
router.put('/locations/:locationid/reviews/:reviewid',auth,ctrlReviews.updateReview); //update
router.delete('/locations/:locationid/reviews/:reviewid',auth,ctrlReviews.deleteReview); //delete

/**
 * Auth End Point for JWT 
*/
router.post('/register',ctrlAuth.register);
router.post('/login',ctrlAuth.login);

module.exports = router;