app.controller('homeController', function($scope, $location, $rootScope, userService){

  // Get My Leaves 
  userService.getLeavesList()
    .success(function(result) {
      if (result.status === 'success') {
        $scope.myLeaves = result.details;
        
        console.log($scope.myLeaves);
      } else {
      }
    }).error(function() {
    });

});

app.controller('myProfileController', function($scope, $location, $rootScope){

});