var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

sendJsonResponse = (res,code,content) => {
    res.status(code);
    res.json(content);
};

var theEarth = (function(){
    var earthRadius = 6371; // km, miles is 3959
    
    var getDistanceFromRads = function(rads) {
        return parseFloat(rads * earthRadius);
    };

    var getRadsFromDistance = function(distance) {
        return parseFloat(distance / earthRadius);
    };
    return {
        getDistanceFromRads : getDistanceFromRads,
        getRadsFromDistance : getRadsFromDistance
    };
})();

module.exports.locationListByDistance = function(req,res){
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var geoOptions = {
        spherical:true,
        maxDistance:theEarth.getRadsFromDistance(100),
        num:10
    };
    var points = {
        type:'Points',
        coordinates:[lng,lat]
    };
    Loc.aggregate(
        [{
          '$geoNear': {
            'near': points,
            'spherical': geoOptions.spherical,
            'distanceField': 'dist.calculated',
            'maxDistance': geoOptions.maxDistance
          }
        }],
        function(err, results) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                locations = buildLocationList(req, res, results);
                sendJsonResponse(res, 200, locations);
            }
        }
    )
};


var buildLocationList = function(req, res, results) {
    console.log('buildLocationList:');
    var locations = [];
    results.forEach(function(doc) {
        locations.push({
          distance: doc.dist.calculated,
          name: doc.name,
          address: doc.address,
          rating: doc.rating,
          facilities: doc.facilities,
          _id: doc._id
        });
    });
    return locations;
};

module.exports.saveLocation = function(req,res){
    var arr = req.body;
    Loc.create({
        name:arr.name,
        address:arr.address,
        facilities:arr.facilities.split(","),
        coords:[parseFloat(arr.lng),parseFloat(arr.lat)],
        openingTimes:[{
                        days: arr.day1,
                        opening: arr.opening1,
                        closing: arr.closing1,
                        closed: arr.closed1,
                    }, 
                    {
                        days: arr.day2,
                        opening: arr.opening2,
                        closing: arr.closing2,
                        closed: arr.closed2,
                    }
                ]
            },function(err, location) {
            if (err) 
            {
                sendJsonResponse(res, 400, err);
            }
            else
            {
                sendJsonResponse(res, 201, location);
            }
    });
};

module.exports.ServeOneLocation = function(req,res){
    var locationid = req.params.locationid;
    if(locationid)
    {
        Loc.findById(locationid)
        .exec(function(err,location) {
            if(err)
            {
                sendJsonResponse(res,404,{"message": "No Location"});
                return;
            }
            sendJsonResponse(res,200,location);
        });
    }
    else
    {
        sendJsonResponse(res,404,{"message": "No locationid"});
    }
};

module.exports.updateLocation = function(req,res){
    var locationid = req.params.locationid;
    if (locationid) {
        Loc
        .findById(locationid)
        .exec(function(err, location) {
                if (err || !location) {
                    sendJsonResponse(res, 404,null);
                    return;
                }
                location.name = req.body.name;
                location.address = req.body.address;
                location.facilities = req.body.facilities.split(',');
                location.coords = [parseFloat(req.body.lng),parseFloat(req.body.lat)];
                location.openingTimes = [{
                        day:req.body.day1,
                        opening:req.body.opening1,
                        closing:req.body.closing1,
                        closed:req.body.closed1
                    },
                    {
                        day:req.body.day2,
                        opening:req.body.opening2,
                        closing:req.body.closing2,
                        closed:req.body.closed2
                    }
                ];
                location.save(function(err,location) {
                    if(err){
                        sendJsonResponse(res, 404,null);
                        return; 
                    }
                    sendJsonResponse(res,200,location);
                });
            }
        );
    } else {
    sendJsonResponse(res, 404, {
        "message": "No locationid"
        });
    }
};

module.exports.deleteLocation = function(req,res){
    var locationid = req.params.locationid;
    if (locationid) {
        Loc
        .findByIdAndRemove(locationid)
        .exec(
        function(err, location) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
                sendJsonResponse(res, 204, null);
            }
        );
    } else {
    sendJsonResponse(res, 404, {
        "message": "No locationid"
        });
    }
};