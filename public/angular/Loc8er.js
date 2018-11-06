angular.module('Loc8erApp', []);
var Loc8erAppBody = function($scope,Loc8erData,geoLocation){
    $scope.message = 'Checking your location...';
    $scope.getData = function(position){
        $scope.message = "Finding places near you...";
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
            console.log(lat,lng);
        var succFn = function(res){
            $scope.message = res.data.length > 0 ? '' : "No Location Found.";
            $scope.data = {
                locations:res.data
            };
        };
        var errFn = function(e){
            $scope.message = 'something went wrong..';
        };
        Loc8erData.ByCoords(lat,lng).then(succFn,errFn);
    }
    $scope.showError = function(error){
        $scope.$apply(function(){
            $scope.message = error.message;
        });
    };
    $scope.NoGeo = function(){
        $scope.$apply(function(){
            $scope.message = 'Geo Location is supported on your browser';
        });
    };
    geoLocation.getPosition($scope.getData,$scope.showError,$scope.NoGeo);
};

var starRating = function(){
    return {
        scope:{
            thisRating:'=rating'
        },
        templateUrl:"/angular/starRating.html"
    };
};

var Loc8erData = function($http){
    var ByCoords = function(lat,lng){
        lng = lng.toFixed(6);
        lat = lat.toFixed(6);
        
        return $http({
            method: 'get', 
            url: '/api/locations?lng='+lng+'&lat='+lat+'&maxDistance=20'
        })
    }
    return {ByCoords:ByCoords};
};

var geoLocation = function(){
    var getPosition = function(cbSuccess,cbError,cbNoGeo){
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition(cbSuccess,cbError);
        }
        else
        {
            cbNoGeo();
        }
    }
    return {getPosition:getPosition};
};

var fixDistance = function(){
    return function(Distance){
        if(Distance > 1){
            return parseFloat(Distance / 1000).toFixed(1)+'km';
        } else {
            return parseInt(Distance * 1000,10) + 'm';
        }
    }
};

angular.module('Loc8erApp')
    .controller('Loc8erAppBody',Loc8erAppBody)
    .directive('starRating',starRating)
    .service('geoLocation',geoLocation)
    .service('Loc8erData',Loc8erData)
.filter('fixDistance',fixDistance);