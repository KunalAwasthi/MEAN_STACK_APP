/* GET 'about' page */
var request = require('request');
module.exports.angularApp = function(req, res){
    res.render('layout', { title: 'Loc8er' });
};
module.exports.about = function(req, res){
    res.render('about', { title: 'About' });
};