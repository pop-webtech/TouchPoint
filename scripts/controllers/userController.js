app.controller('loginController', function($scope, $location, $rootScope, userService){
  $rootScope.login_status = false;
  $scope.userLoginClicked = false;

  $scope.userLogin = function () {
    $scope.userLoginClicked = true;
    var loginData = {
      "username": $scope.user.userEmail,
      "password": $scope.user.userPassword
    };

    userService.userLogin(loginData)
      .success(function(result) {
        if (result.status === 'success') {
          localStorage.setItem('authToken', result.access_token);
          localStorage.setItem('sessionId', result.session_id);
          $rootScope.login_status = true;
          $location.path('/home');
        } else {
          $scope.userLoginClicked = false;
          $scope.errMsg = 'Invalid UserName and Password.';
        }
      }).error(function() {
        $scope.userLoginClicked = false;
        $scope.errMsg = 'This service is temporarily not available.';
      });
  }
});

app.controller('logoutController', function($scope,$location,$rootScope){
  $rootScope.login_status = false;
  localStorage.clear();
  $location.path("/");
});
