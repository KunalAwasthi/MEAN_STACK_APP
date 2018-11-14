function fixDate(){
    return function(dateString){
        var date = new Date(dateString);
        var months = ["January","February","March","April","May","June","July","Augest","September","October","November","December"];
        var day = date.getDate();
        var month = months[date.getMonth()];
        var year = date.getFullYear();
        var output = day + ' ' + month + ' ' + year;
        return output;
    };
}

angular.module('Loc8erApp')
.filter('fixDate',fixDate);