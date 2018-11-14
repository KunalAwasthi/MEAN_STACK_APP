var mongoose = require('mongoose');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');

var userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    hash:String,
    salt:String
});

userSchema.methods.createHash = function(password){
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex');
};

userSchema.methods.isValidPassword = function(password){
    var hash = crypto.pbkdf2Sync(password,this.salt,1000,64,'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.createJWT = function(){
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  
  return jwt.sign({
      _id:this._id,
      name:this.name,
      email:this.email,
      exp:(expiry.getTime() / 1000),
  }, process.env.JWT_SECRET);
};

mongoose.model('User',userSchema);