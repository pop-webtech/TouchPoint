app.controller('loginController', function($scope, $location, APIService){
	$scope.userLogin = function() {
		var data = {
			url: apiUrl+'login.php',
			inputData: {"username":$scope.userEmail,"password":$scope.userPassword}
		};
		APIService.processRequest(data)
		.success(function(data){
			localStorage.setItem('authToken', data.access_token);
			localStorage.setItem('sessionId', data.session_id);
			$location.path('/home');
    })
    .error(function(){
      $scope.errMsg = 'Invalid UserName and Password.';
    });

	}
});

app.controller('logoutController', function($scope,$location){
  localStorage.clear();
  $location.path("/");
});
