ctrl.$inject = ['$uibModalInstance','Loc8erData','locationData'];
function ctrl($uibModalInstance,Loc8erData,locationData){
    var vm = this;
    
    vm.modal = {
        cancel:function() {
            $uibModalInstance.dismiss('cancel');
        },
        close:function(data){
            $uibModalInstance.close(data);
        }
    };

    vm.onSubmit = function(){
        if(!vm.formData.name ||!vm.formData.rating || !vm.formData.reviewText){
            vm.error = "All Fields are required";
            return false;
        }
        vm.error = "";
        vm.addReview(locationData.locationid,vm.formData);
        return true;
    };

    vm.addReview = function(id,formData){
        Loc8erData.AddReview(id,{
            name:formData.name,
            rating:formData.rating,
            reviewText:formData.reviewText
        })
        .then(function(res){
            if(res.data){
                vm.modal.close(res.data);
            }
        },
        function(err){
            vm.error = "Review was not added, Something went wrong.";
        });
    }

    //setting up location data and some other initial modal data..
    vm.locationData = locationData;
    vm.error = '';

    vm.formData = {
        rating:'5'
    };

}

angular
.module('Loc8erApp')
.controller('reviewModalCtrl',ctrl);