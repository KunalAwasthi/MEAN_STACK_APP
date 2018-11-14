angular.module('Loc8erApp')
.directive('pageHeader',pageHeader)

function pageHeader() {
    return {
        restrict:'EA',
        templateUrl:'/common/directives/pageHeader/pageHeader.directive.html'
    };
}