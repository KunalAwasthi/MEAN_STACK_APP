/* GET 'home' page */
var request = require('request');
var apiOptions = {
    server:'http://localhost:3000'
};

module.exports.homeList = function(req, res){
    RenderHomePageList(req,res);
};

_fixDistance = function (Distance) {
    if(Distance > 1){
        return parseFloat(Distance).toFixed(1)+'km';
   } else {
       return parseInt(Distance * 1000,10) + 'm';
   }
};

RenderHomePageList = function(req,res,body){
    var message;
    if(!(body instanceof Array))
    {
        message = "API lookup error";
    }
    else if(!body.length)
    {
        message = "No Location Found";
    }
    res.render('location-list', 
        {
            'title':'Loc8er - Find places to work with wifi new you !',
            header:{
                headerText:'Loc8er',
                slogan:'Find places to work with wifi new you !'
            },
            message:message
        }
    );
};


/* GET 'Location info' page */
module.exports.locationInfo = function(req, res){

    var requestOptions,path;
    path = '/api/locations/'+req.params.locationid;
    requestOptions = {
        url:apiOptions.server+path,
        json:{},
        method:'GET'
    };

    request(requestOptions,function(err,response,body){
        var data = body;
        data.coords = {
            lng:data.coords[0],
            lat:data.coords[1]
        };
        RenderSingleLocationData(req,res,data);
    });    
    
};

RenderSingleLocationData = function(req,res,body){
    res.render('location-info',{
            'title':'Loc8er - Find places to work with wifi new you !',
            header:{
                headerText:'Loc8er',
                slogan:'Find places to work with wifi new you !'
            },
            sidebar: {
                context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done',
                callToAction: 'If you\'ve been and you like it - or if you don\'t - please\
                leave a review to help other people just like you'
            },
            location:body
        }
    );
};

/* GET 'Add review' page */
module.exports.addReview = function(req, res){
res.render('add-review', { title: 'Add review','locationid':req.params.locationid });
};

/* POST 'Add Review Handles Form submision' */
module.exports.handleAddReview = function(req, res){
    
    let location_id = req.params.locationid;
    
    if(validateForm(req.body,res))
    {
        let data = {
            name:req.body.author,
            rating:parseInt(req.body.rating,10),
            reviewText:req.body.review
        };
        let requestOptions,path;
        
        path = '/api/locations/'+location_id+'/reviews';
        requestOptions = {
            url:apiOptions.server+path,
            json:data,
            method:'POST'
        };

        request(requestOptions,function(err,response,body){
            if(response.statusCode == 200)
            {
                res.redirect('/location/'+location_id);
            }
            else if(response.statusCode == 400)
            {
                res.redirect('/location/'+location_id+'/review/new');
            }
        });  
    }
    else
    {
        res.redirect('/location/'+location_id+'/review/new');
    }
};

function validateForm(body,res){
    if(!body.author
        || !body.rating
        || !body.review
    )
    {
        return false;
    }
    return true;
}