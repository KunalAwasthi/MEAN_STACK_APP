loginCtrl.$inject = ['$location','auth'];

function loginCtrl($location,auth)
{
    var vm = this;
    vm.cred = {
        email:'',
        password:''
    };

    vm.onSubmit = function(){
        if(vm.cred.email == ''
        || vm.cred.password == ''
        )
        {
            vm.formError = "All fields are required";
            return;
        }
        else
        {
            delete vm.cred.cpassword;
            vm.doLogin();
        }
    };

    vm.returnPage = $location.search().page || '/';  

    vm.doLogin = function(){
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
        .login(vm.cred)
        .then(sucFn,errFn);
    };
}

angular
.module('Loc8erApp')
.controller('loginCtrl',loginCtrl);