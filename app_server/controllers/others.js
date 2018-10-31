/* GET 'about' page */
var request = require('request');

module.exports.about = function(req, res){
    res.render('about', { title: 'About' });
};