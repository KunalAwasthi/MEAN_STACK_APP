angular.module('Loc8erApp')
.controller('locationViewCtrl',locationViewCtrl);

function locationViewCtrl(Loc8erData,$uibModal,$routeParams){
    var vm = this;
    vm.locationid = $routeParams.locationid;
    vm.pageHeader = {
        title:'Location Details'
    };
    vm.sidebar = {
        context: 'is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done',
        callToAction: 'If you\'ve been and you like it - or if you don\'t - please\
        leave a review to help other people just like you'
    };

    var sucFn = function(res){
        vm.location = res.data;
        vm.location.imgUrl = encodeURI('https://maps.googleapis.com/maps/api/staticmap?center='+vm.location.coords[0]+','+vm.location.coords[1]+'&scale=1&zoom=19&size=400x400&maptype=roadmap&markers=color:blue%7Clabel:S%7C'+vm.location.coords[0]+','+vm.location.coords[1]+'&key=AIzaSyD1VqbTSDkwop5wWEDMBi5UPHRA4Nb2Lcs');
        vm.locationName = vm.location.name;
    };

    var erFn = function(e){
        console.log(e);
    };

    Loc8erData.ById(vm.locationid)
    .then(sucFn,erFn);

    vm.showPopupAddReview = function(){
        var modalInstance = $uibModal.open({
            templateUrl:'/reviewModal/reviewModal.template.html',
            controller:'reviewModalCtrl as vm',
            resolve:{
                locationData:function(){
                    return {
                        locationid:vm.locationid,
                        locationName:vm.location.name
                    };
                }
            }
        });
        modalInstance.result.then(function(data){
            vm.location.reviews.push(data);
        });
    }
};
