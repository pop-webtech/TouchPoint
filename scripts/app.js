var app = angular.module('touchpoint', ['ngAnimate', 'ngAria', 'ngMaterial','ngMessages','ngRoute']);

app.config(function($routeProvider, $mdThemingProvider, $httpProvider, $mdDateLocaleProvider){

  //Enable cross domain calls
  $httpProvider.defaults.useXDomain = true;
  //Remove the header containing XMLHttpRequest used to identify ajax call 
  //that would prevent CORS from working
  delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $mdThemingProvider.theme('red')
    .primaryPalette('purple') // specify primary color, all
                            // other color intentions will be inherited
                            // from default
  
  $routeProvider
  .when('/', {
    templateUrl : 'views/login.tpl.html',
    controller : 'loginController',
    resolve:{
      "check":function($location,$rootScope){
        $rootScope.saved = localStorage.getItem('authToken');
        $rootScope.usrInfo = ($rootScope.saved ===null || $rootScope.saved ==="undefined") ? false : true; 
        if($rootScope.usrInfo){
          $location.path('/home');    //redirect user to home.
          $rootScope.login_status = 1;
        }
      }
    }
  })

  .when('/home', {
    templateUrl : 'views/home.tpl.html',
    resolve:{
      "check":function($location,$rootScope) {
        $rootScope.saved = localStorage.getItem('authToken');
        $rootScope.usrInfo = ($rootScope.saved ===null || $rootScope.saved ==="undefined") ? false : true; 
        if(!$rootScope.usrInfo) {
          $location.path('/');    //redirect user to home.
        }
      }
    },
    controller : 'homeController'
  })

  .when('/profile', {
    templateUrl : 'views/myProfile.tpl.html',
    resolve:{
      "check":function($location,$rootScope) {
        $rootScope.saved = localStorage.getItem('authToken');
        $rootScope.usrInfo = ($rootScope.saved ===null || $rootScope.saved ==="undefined") ? false : true; 
        if(!$rootScope.usrInfo) {
          $location.path('/');    //redirect user to home.
        }
      }
    },
    controller : 'myProfileController'
  })

  .when('/logout', {
    templateUrl : 'views/logout.tpl.html',
    controller : 'logoutController'
  })

  .otherwise({
    redirectTo: '/'
  });

});

app.service('userService', function ($http) {
  var apiUrl = 'http://dev.popcornapps.com/touchpoint/api/';
  this.userLogin = function(loginData) {
    return $http({
      method  : "POST",
      url     : apiUrl + 'login.php',
      data    : loginData,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    });
  };

  this.forgotPassword = function(forgotData) {
    return $http({
      method  : "POST",
      url     : apiUrl + 'forgotpassword.php',
      data    : forgotData,
      headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    });
  };

  this.getLeavesList = function() {
    return $http({
      method  : "POST",
      url     : apiUrl + 'getleavedetails.php',
      data    : getAccessTokenData(),
      headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    });
  };

  this.getTeamLeavesList = function() {
    return $http({
      method  : "POST",
      url     : apiUrl + 'getteamleavedetails.php',
      data    : getAccessTokenData(),
      headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    });
  };

  this.getLeavesTypes = function() {
    return $http({
      method  : "POST",
      url     : apiUrl + 'getleavetypes.php',
      data    : getAccessTokenData(),
      headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    });
  };

  this.getEmployeeDetails = function() {
    return $http({
      method  : "POST",
      url     : apiUrl + 'getemployeedetails.php',
      data    : getAccessTokenData(),
      headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    });
  };

  this.applyLeave = function(leaveData) {
    console.log(mapApplyLeave(leaveData));
    return $http({
      method  : "POST",
      url     : apiUrl + 'leaverequest.php',
      data    : mapApplyLeave(leaveData),
      headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    });
  };

  this.getHolidays = function() {
    return $http({
      method  : "POST",
      url     : apiUrl + 'getholidayslist.php',
      data    : getAccessTokenData(),
      headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
    });
  };

  function mapApplyLeave(leaveData) {
    return {
      "access_token": localStorage.getItem('authToken'),
      "session_id": localStorage.getItem('sessionId'),
      "leave_type_id": leaveData.type,
      "from_date": new Date(leaveData.fromDate).toLocaleDateString(),
      "to_date": new Date(leaveData.toDate).toLocaleDateString(),
      "reason": leaveData.reason,
      "leave_id":""
    };
  };

  function getAccessTokenData() {
    return {
      "access_token": localStorage.getItem('authToken'),
      "session_id": localStorage.getItem('sessionId')
    };
  }

});
