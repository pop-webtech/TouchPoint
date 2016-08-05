app.controller('loginController', ['$scope', '$location', '$rootScope', function($scope, $location, $rootScope){
    $rootScope.login_status = false;
}]);

app.controller('logoutController', ['$scope','$location', '$rootScope', function($scope,$location,$rootScope){
    $rootScope.login_status = false;
    localStorage.clear();
    $location.path("/");
}]);
