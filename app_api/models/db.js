var mongoose = require('mongoose');
var dbURI = "mongodb://localhost/Loc8er";

mongoose.connect(dbURI,{useNewUrlParser:true});

mongoose.connection.on('connected',function(){
    console.log('connected to mongoDB at '+dbURI);
});

mongoose.connection.on('error',function(err){
    console.log('Error traced in mongoDBConnection at '+dbURI +' '+err);
});

mongoose.connection.on('disconnected',function(){
    console.log('disconnected from mongoDB at '+dbURI);
});

gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
      callback();
    });
};

process.once('SIGUSR2', function () {
    gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
    });
});
// For app termination
process.on('SIGINT', function() {
    gracefulShutdown('app termination', function () {
        process.exit(0);
    });
});
// For Heroku app termination
process.on('SIGTERM', function() {
    gracefulShutdown('Heroku app shutdown', function () {
        process.exit(0);
    });
});

require('./locations');