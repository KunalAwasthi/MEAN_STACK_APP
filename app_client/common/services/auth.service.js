auth.$inject = ['$window','$http'];

function auth($window,$http){
    var saveToken = function(token){
        $window.localStorage['jwt-token'] = token;
        return true;
    };

    var getToken = function(){
        return $window.localStorage['jwt-token'] 
    };

    var login = function(user){
        return $http({
            method:'POST',
            url:'/api/login',
            data:user
        });
    }

    var register = function(user){
        return $http({
            method:'POST',
            url:'/api/register',
            data:user
        });
    }

    var isLoggedIn = function(){
        var token = getToken();
        if(token){
            payload = JSON.parse($window.atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        }
        return false;
    }

    var currentUser = function(){
        if(isLoggedIn()){
            var token = getToken();
            if(token){
                payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    name:payload.name,
                    email:payload.email
                };
            }
        }
    }

    return {
        saveToken: saveToken,
        getToken: getToken,
        login: login,
        register: register,
        isLoggedIn: isLoggedIn,
        getUser: currentUser
    };
};

angular
.module('Loc8erApp')
.service('auth',auth);