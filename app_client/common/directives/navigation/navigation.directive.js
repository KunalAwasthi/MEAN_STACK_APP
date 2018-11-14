angular.module('Loc8erApp')
.directive('navigation',navigation)

function navigation() {
    return {
        restrict:'EA',
        templateUrl:'/common/directives/navigation/navigation.directive.html'
    };
}