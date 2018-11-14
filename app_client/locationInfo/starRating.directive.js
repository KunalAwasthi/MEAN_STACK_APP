var starRating = function(){
    return {
        scope:{
            thisRating:'=rating'
        },
        templateUrl:"/locationInfo/starRating.directive.html"
    };
};

angular.module('Loc8erApp').directive('starRating',starRating);