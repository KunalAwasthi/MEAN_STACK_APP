var express = require('express');
var router = express.Router();
//controllers
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');
/*location pages*/
router.get('/',ctrlLocations.homeList);
router.get('/location/:locationid',ctrlLocations.locationInfo);
router.get('/location/:locationid/review/new',ctrlLocations.addReview);
router.post('/location/:locationid/review/add',ctrlLocations.handleAddReview);

/*Other Pages */
router.get('/about',ctrlOthers.about);

module.exports = router;
