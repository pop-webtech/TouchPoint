app.controller('homeController', function($scope, $location, $rootScope, userService, $mdDialog, $mdMedia, $mdSidenav){

  $scope.showMobileMainHeader = true;
    $scope.openSideNavPanel = function() {
        $mdSidenav('left').open();
    };
    $scope.closeSideNavPanel = function() {
        $mdSidenav('left').close();
    };


  // Get employee details
  userService.getEmployeeDetails()
  .success(function(result) {
    if (result.status === 'success') {
      $scope.empData = result.details;
    } else {
    }
  }).error(function() {
  });

  // Get My Leaves 
  userService.getLeavesList()
  .success(function(result) {
    if (result.status === 'success') {
      if (!angular.isUndefined(result.details.message)) {
        $scope.myLeaves = [];
      } else {
        $scope.myLeaves = result.details;
      }
    } else {
    }
  }).error(function() {
  });

  // Get My Leaves 
  userService.getTeamLeavesList()
  .success(function(result) {
    if (result.status === 'success') {
      if (!angular.isUndefined(result.details.message)) {
        $scope.isSupervisor = result.details.isSupervisor;
        $scope.teamLeaves = [];
      } else {
        $scope.teamLeaves = result.details;
      }
    } else {
    }
  }).error(function() {
  });

  $scope.showAdvanced = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      controller: applyLeaveController,
      templateUrl: 'views/apply-leave.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    });
  };

  function applyLeaveController($scope, $mdDialog) {

    $scope.minDate = new Date();

    // Get leave types 
    userService.getLeavesTypes()
    .success(function(result) {
      if (result.status === 'success') {
        $scope.leaveTypes = result.details;
      } else {
      }
    }).error(function() {
    });

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.applyLeave = function() {
      console.log($scope.leave);
      $mdDialog.hide();
    };
  }

  $scope.viewLeave = function(ev,leave){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
    $mdDialog.show({
      locals: {leaveData: leave},
      controller: viewLeaveController,
      templateUrl: 'views/view-leave.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    });
  }

  function viewLeaveController($scope, leaveData)
  {
    $scope.leaveData = leaveData;
    // console.log(leaveData.Employee__r.Employee_Name__c);
    
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

  }

  // user logout menu item clicked
  $scope.userLogout = function () {
    $location.path('/logout');
  }
});




app.controller('myProfileController', function($scope, $location, $rootScope){

});