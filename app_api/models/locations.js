var mongoose = require('mongoose');

var reviewSchema = new mongoose.Schema({
    author:{type:String,required:true},
    rating:{type:Number,"default":0,min:0,max:5},
    reviewText:{type:String},
    timestamp:{type:Date,default:Date.now}
});


var openingsHoursScehma = new mongoose.Schema({
    day:{type:String,required:true},
    opening:{type:String},
    closing:{type:String},
    closed:{type:Boolean,required:true}
});

var locationSchema = new mongoose.Schema({
    name:{type:String,required:true},
    address:{type:String,required:true},
    rating:{type:Number,"default":0,min:0,max:5},
    facilities:[String],
    coords:{type:[Number],index:'2dsphere'},
    openingTimes:[openingsHoursScehma],
    reviews:[reviewSchema]
});

mongoose.model('Location',locationSchema);