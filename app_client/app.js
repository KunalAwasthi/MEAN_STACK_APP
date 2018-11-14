angular.module('Loc8erApp', ['ngRoute','ngSanitize','ui.bootstrap']);

function config ($routeProvider,$locationProvider) {
    $routeProvider
    .when('/', {
    templateUrl: '/home/home.view.html',
    controller:'homeCtrl',
    controllerAs:'vm'
    })
    .when('/about', {
        templateUrl: '/about/about.view.html',
        controller:'abtCtrl',
        controllerAs:'vm'
    })
    .when('/location/:locationid', {
        templateUrl: '/locationInfo/locationInfo.view.html',
        controller:'locationViewCtrl',
        controllerAs:'vm'
    })
    .otherwise({redirectTo: '/'});
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
      });
}

angular
    .module('Loc8erApp')
    .config(config);