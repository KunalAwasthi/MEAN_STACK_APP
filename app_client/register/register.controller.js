registerCtrl.$inject = ['$location','auth'];
function registerCtrl($location,auth){
    var vm = this;
    vm.cred = {
        fname:'',
        lname:'',
        email:'',
        password:'',
        cpassword:''
    }

    vm.onSubmit = function(){
        if(vm.cred.name == ''
           || vm.cred.email == ''
           || vm.cred.password == ''
           || vm.cred.cpassword == ''
        ){
            vm.formError = "All fields are required";
            return;
        }
        else if(vm.cred.cpassword !== vm.cred.password)
        {
            vm.formError = "confirmation password doesn't match.";
            return;    
        }
        else
        {
            delete vm.cred.cpassword;
            vm.doRegister();
        }
    };

    vm.returnPage = $location.search().page || '/';

    vm.doRegister = function(){
        var errFn = function(err){
            console.log(err);
        } 
        var sucFn = function(res){
            if(auth.saveToken(res.data.token)){
                $location.search('page',null);
                $location.path(vm.returnPage);
            }
        }
        auth
        .register(vm.cred)
        .then(sucFn,errFn);
    }

}
angular
.module('Loc8erApp')
.controller('registerCtrl',registerCtrl);