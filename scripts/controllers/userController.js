app.controller('loginController', function($scope, $location, $rootScope, userService){
  $rootScope.isLogin = true;
  $rootScope.login_status = false;
  $scope.userLoginClicked = false;
  $scope.forgot = {};
  $scope.user = {};

  $scope.userLogin = function () {
    $scope.userLoginClicked = true;
    $scope.errMsg = '';
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

  $scope.showForgot = function(val) {
    $rootScope.isLogin = val;
  };

  $scope.forgotPassword = function () {
    $scope.userLoginClicked = true;
    $scope.errMsg = '';
    $scope.successMsg = '';
    var forgotData = {
      "email_id": $scope.forgot.userEmail
    };

    userService.forgotPassword(forgotData)
      .success(function(result) {
        $scope.userLoginClicked = false;
        if (result.status === 'success') {
          $scope.successMsg = result.details.message;
        } else {
          $scope.errMsg = 'Invalid Email-ID.';
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
