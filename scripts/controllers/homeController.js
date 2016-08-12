app.controller('homeController', function($scope, $location, $rootScope, userService, $mdDialog, $mdMedia, $mdSidenav, $mdToast){

  // sidebar nav
  $scope.showMobileMainHeader = true;
  $scope.openSideNavPanel = function() {
    $mdSidenav('left').open();
  };
  $scope.closeSideNavPanel = function() {
    $mdSidenav('left').close();
  };

  //get my leaves
  getLeavesList();


  // Get employee details
  userService.getEmployeeDetails()
  .success(function(result) {
    if (result.status === 'success') {
      $scope.empData = result.details;
    } else {
      if (result.status_code === 400 && result.details.message === 'Invalid session Id') {
        $scope.userLogout();
      }
    }
  }).error(function() {
  });

  function getLeavesList() {
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
        if (result.status_code === 400 && result.details.message === 'No leaves applied') {
          $scope.myLeaves = [];
        } else if (result.status_code === 400 && result.details.message === 'Invalid session Id') {
          $scope.userLogout();
        }
      }
    }).error(function() {
    });
  }

  // Get Team Leaves 
  userService.getTeamLeavesList()
  .success(function(result) {
    if (result.status === 'success') {
      $scope.teamLeaves = result.details;
    } else {
      if (result.status_code === 400 && result.details.message === 'No leaves applied') {
        $scope.isSupervisor = result.details.isSupervisor;
        $scope.teamLeaves = [];
      } else if (result.status_code === 400 && result.details.message === 'Invalid session Id') {
        $scope.userLogout();
      }
    }
  }).error(function() {
  });

  $scope.applyLeave = function(ev) {
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
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
        // $scope.userLogout();
      }
    }).error(function() {
    });
    
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.requestLeave = function() {
      // Apply new leave 
      userService.applyLeave($scope.leave)
      .success(function(result) {
        console.log(result);
        if (result.status === 'success') {
          $scope.successMsg = result.details.message;
          // Reset the form model.
          $scope.leave = {};
          // Set back to pristine.
          $scope.applyLeaveform.$setPristine();
          // Since Angular 1.3, set back to untouched state.
          $scope.applyLeaveform.$setUntouched();
          // $mdDialog.hide();
          getLeavesList();
        } else {
          if (result.status_code === 400 && result.details.message === 'Invalid session Id') {
            $scope.userLogout();
          } else {
            $scope.errMsg = result.details.message;
          }
        }
      }).error(function() {
      });
    };
  }

  $scope.viewLeave = function(ev,leave){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
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

  function viewLeaveController($scope, leaveData) {
    $scope.leaveData = leaveData;
    $scope.leaveStatus = ['Approved', 'Rejected'];
    $scope.updateLeave = {};
    $scope.successMsg = '';
    $scope.errMsg = '';

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.updateLeaveRequest = function() {
      // Update leave 
      $scope.updateLeave.empLeaveId = $scope.leaveData.Id;
      userService.updateLeave($scope.updateLeave)
      .success(function(result) {
        if (result.status === 'success') {
          $scope.leaveData.Status__c = $scope.updateLeave.status;
          $scope.leaveData.Supervisor_Comments__c  = $scope.updateLeave.reason;
          $scope.successMsg = result.details.message;


          $mdToast.show(
            $mdToast.simple()
              .textContent(result.details.message)
              .position('top right')
              .hideDelay(3000)
          );
          getLeavesList();
        } else {
          if (result.status_code === 400 && result.details.message === 'Invalid session Id') {
            $scope.userLogout();
          } else {
            $scope.errMsg = result.details.message;
          }
        }
      }).error(function() {
      });
    };
  }

  // View Profile

  $scope.viewProfile = function(ev){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      locals: {empData: $scope.empData},
      controller: viewProfileController,
      templateUrl: 'views/view-profile.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    });
  }

  function viewProfileController($scope, empData) {
    $scope.empData = empData.Employee__r;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
  }

  // Holidays list
  $scope.getHolidays = function(ev){
    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'));
    $mdDialog.show({
      controller: getHolidaysController,
      templateUrl: 'views/holidays.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    });
  }

  function getHolidaysController($scope) {
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    // Get leave types 
    userService.getHolidays()
    .success(function(result) {
      if (result.status === 'success') {
        $scope.holidaysList = result.details;
      } else {
        if (result.status_code === 400 && result.details.message === 'Invalid session Id') {
          $scope.userLogout();
        }
      }
    }).error(function() {
    });
  }


  // user logout menu item clicked
  $scope.userLogout = function () {
    $location.path('/logout');
  }
});