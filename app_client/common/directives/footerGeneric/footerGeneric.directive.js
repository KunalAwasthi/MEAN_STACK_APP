angular.module('Loc8erApp')
.directive('footerGeneric',footerGeneric)

function footerGeneric() {
    return {
        restrict:'EA',
        templateUrl:'/common/directives/footerGeneric/footerGeneric.directive.html'
    };
}