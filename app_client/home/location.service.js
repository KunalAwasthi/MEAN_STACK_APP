var loc8erData = function($http){
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

angular
    .module('Loc8erApp')
    .service('Loc8erData',loc8erData);
    