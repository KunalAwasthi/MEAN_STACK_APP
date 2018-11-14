var mongoose = require('mongoose');
var passport = require('passport');
var User = mongoose.model('User');
sendJsonResponse = (res,code,content) => {
    res.status(code);
    res.json(content);
};


module.exports.register = function(req,res){
    if(!req.body.name || !req.body.email || !req.body.password)
    {
        sendJsonResponse(res,400,{'ok':0,'message':'missing parameters'});
        return ;
    }
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.createHash(req.body.password);
    user.save(function(err){
        var token;
        if(err)
        {
            sendJsonResponse(res,400,err);
            return ;
        }
        token = user.createJWT();
        sendJsonResponse(res,200,{
            token:token
        });
    });
};


module.exports.login = function(req,res){
    if(!req.body.email || !req.body.password)
    {
        sendJsonResponse(res,400,{'ok':0,'message':'missing parameters'});
        return;
    }
    console.log('In login controller');
    passport.authenticate('local',function(err,user,info){
        console.log('In passport Auth');
        var token;
        if(err)
        {
            sendJsonResponse(res,404,{'ok':0,'message':'User Not Found.'});
            return;
        }

        if(user)
        {
            token = user.createJWT();
            sendJsonResponse(res,200,{token:token});
        }
        else
        {
            sendJsonResponse(res,401,info);
        }
    })(req, res);

};