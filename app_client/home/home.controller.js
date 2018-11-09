
function controller ($scope,Loc8erData,geolocation) {
    var vm = this;
    vm.pageHeader = {
        'title':'Loc8er - Find places to work with wifi new you !',
        header:{
            headerText:'Loc8er',
            slogan:'Find places to work with wifi new you !'
        },
        sidebar: {
            content: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        },
        message:""
    };
    vm.message = 'Checking your location...';
    
    vm.getData = function(position){
        vm.message = "Finding places near you...";
        var lat = position.coords.latitude,
            lng = position.coords.longitude;
            console.log(lat,lng);
        var succFn = function(res){
            vm.message = res.data.length > 0 ? '' : "No Location Found.";
            vm.data = {
                locations:res.data
            };
        };
        var errFn = function(e){
            vm.message = 'something went wrong..';
        };
        Loc8erData.ByCoords(lat,lng).then(succFn,errFn);
    }

    vm.showError = function(error){
        $scope.$apply(function(){
            vm.message = error.message;
        });
    };
    
    vm.NoGeo = function(){
        $scope.$apply(function(){
            vm.message = 'Geo Location is supported on your browser';
        });
    };
    
    geolocation.getPosition(vm.getData,vm.showError,vm.NoGeo);
}
angular
.module('Loc8erApp')
.controller('homeCtrl',controller);