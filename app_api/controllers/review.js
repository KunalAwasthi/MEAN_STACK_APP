var mongoose = require('mongoose');
var Loc = mongoose.model('Location');
var User = mongoose.model('User');

sendJsonResponse = (res,code,content) => {
    res.status(code);
    res.json(content);
};

calculateRating = (req,res,location) => {
   var rating = 0,ratingCount;
   if(location.reviews && location.reviews.length)
   {
        ratingCount = location.reviews.length;
        for(var i = 0 ; i < ratingCount ; i++)
        {
            rating += parseInt(location.reviews[i].rating);
        }

        rating = parseInt(rating / ratingCount,10);
        location.rating = rating;
        location.save(function(err,location) {
            if(err)
            {
                sendJsonResponse(res,400,err);
                return;
            }
            sendJsonResponse(res,200,location.reviews[location.reviews.length-1]);
        });
   }
};

updateRating = (req,res,location) => {
    Loc.findById(location._id)
    .select('rating reviews')
    .exec(function(err,location){
        calculateRating(req,res,location);
    });
}

AddReview = function(req,res,location,author) {
    location.reviews.push({
        author:author,
        rating:req.body.rating,
        reviewText:req.body.reviewText
    });
    location.save(function(err,location) {
        if(err)
        {
            sendJsonResponse(res,400,err);
            return;    
        }
        updateRating(req,res,location);
    });
};

var getAuthor = function(req,res,location,callback){
    if(req.payload && req.payload.email)
    {
        User.findOne({email:req.payload.email},function(err,user){
            if(!user)
            {
                sendJsonResponse(res,404,{message:"user not found"});
                return;
            }
            else if(err)
            {
                sendJsonResponse(res,404,err);
                return;
            }
            callback(req,res,location,user.name);
        });
    }
    else
    {
        sendJsonResponse(res,404,{message:"user not found"});
        return;
    }
}

module.exports.saveReview = function(req,res){
    var Locationid = req.params.locationid;
    
    Loc.findById(Locationid)
    .exec(function(err,location) {
        if(err || !location)
        {
            sendJsonResponse(res,404,{messsage:"No Such Location Found."});
            return;
        }
        getAuthor(req,res,location,AddReview);
    });
};


module.exports.readOne = function(req,res){
    var Locationid = req.params.locationid;
    var reviewid = req.params.reviewid;
    Loc.findById(Locationid)
    .exec(function(err,location) {
        if(err || !location)
        {
            sendJsonResponse(res,404,{messsage:"No Such Location Found."});
            return;
        }
        var review = location.reviews.id(reviewid); 
        sendJsonResponse(res,200,review);
    });
};

var updateReview = function(req,res,location,author){
    if(location && location.reviews.length > 0)
    {
        var review = location.reviews.id(req.params.reviewid); 
        
        review.author = author;
        review.rating = req.body.rating;
        review.reviewText = req.body.reviewText;
        
        location.save(function(err,location){
            if(err)
            {
                sendJsonResponse(res,404,err);
                return;
            }
            updateRating(req,res,location);
        });
    }   
}

module.exports.updateReview = function(req,res){
    var Locationid = req.params.locationid;
    var reviewid = req.params.reviewid;
    Loc.findById(Locationid)
    .exec(function(err,location) {
        if(err || !location)
        {
            sendJsonResponse(res,404,{message:"No Such Location Found."});
            return;
        }
        getAuthor(req,res,location,updateReview);
    });
};

module.exports.deleteReview = function(req,res){
    var Locationid = req.params.locationid;
    var reviewid = req.params.reviewid;
    Loc.findById(Locationid)
    .exec(function(err,location) {
        if(err || !location)
        {
            sendJsonResponse(res,404,{messsage:"No Such Location Found."});
            return;
        }
        if(location && location.reviews.length > 0)
        {
            var review = location.reviews.id(reviewid);
            if(!review)
            {
                sendJsonResponse(res,400,{message:"No Such Review Found."});
                return;
            } 
            location.reviews.id(reviewid).remove();
            location.save(function(err,location){
                if(err)
                {
                    sendJsonResponse(res,404,{messsage:"No Such Location Found."});
                    return;
                }
                updateRating(req,res,location);
            });
        }
    });
};