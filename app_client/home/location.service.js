var loc8erData = function($http){
    var ByCoords = function(lat,lng){
        lng = lng.toFixed(6);
        lat = lat.toFixed(6);
        
        return $http({
            method: 'get', 
            url: '/api/locations?lng='+lng+'&lat='+lat+'&maxDistance=20'
        })
    }
    var ById = function(locationid){
        return $http({
            method: 'get', 
            url: '/api/locations/'+locationid
        });
    };

    var AddReview = function(locationid,data){
        return $http({
            method:'post',
            url:'/api/locations/'+locationid+'/reviews',
            data:data
        });
    }

    return {
        ByCoords:ByCoords,
        ById:ById,
        AddReview:AddReview
    };
};

angular
    .module('Loc8erApp')
    .service('Loc8erData',loc8erData);
    