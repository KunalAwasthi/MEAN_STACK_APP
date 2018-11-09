angular.module('Loc8erApp', ['ngRoute']);

function config ($routeProvider) {
    $routeProvider
    .when('/', {
    templateUrl: 'home/home.view.html',
    controller:'homeCtrl',
    controllerAs:'vm'
    })
    .otherwise({redirectTo: '/'});
    }

angular
    .module('Loc8erApp')
    .config(config);