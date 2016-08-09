var app = angular.module('touchpoint', ['ngAnimate', 'ngAria', 'ngMaterial','ngMessages','ngRoute']);

app.config(function($routeProvider, $mdThemingProvider, $httpProvider){

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
  })

  .when('/home', {
    templateUrl : 'views/home.tpl.html',
    controller : 'homeController'
  })

  .when('/profile', {
    templateUrl : 'views/myProfile.tpl.html',
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

  function getAccessTokenData() {
    return {
      "access_token": localStorage.getItem('authToken'),
      "session_id": localStorage.getItem('sessionId')
    };
  }

});
