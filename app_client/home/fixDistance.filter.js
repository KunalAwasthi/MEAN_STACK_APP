
function fixDistance(){
    return function(distance){
        if(distance > 100){
            return parseFloat(distance / 1000).toFixed(1)+'km';
        } else {
            return parseInt(distance/10,10) + 'm';
        }
    }
};

angular.module('Loc8erApp')
.filter('fixDistance',fixDistance);