function nltobr(){
    return function(text){
        return text.replace('\n','</br></br>');
    };
}

angular.module('Loc8erApp')
.filter('nltobr',nltobr);