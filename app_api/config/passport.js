var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

passport.use(new LocalStrategy({usernameField:'email'},
    function (email,password,done) {
        console.log('In passport use');
        User.findOne({email:email},function(err,user){
            if(err)
            {
                return done(null,false,{message:'Incorrect username.'});
            }

            if(!user.isValidPassword(password))
            {
                return done(null,false,{message:'Incorrect password.'});
            }
            return done(null,user);
        })
    })
);