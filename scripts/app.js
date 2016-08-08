var app = angular.module('touchpoint', ['ngAnimate', 'ngAria', 'ngMaterial','ngMessages','ngRoute']);

var apiUrl = 'http://localhost/api/';
app.config(function($routeProvider){
  $routeProvider
  .when('/', {
    templateUrl : 'views/login.tpl.html',
    controller : 'loginController',
  })

  .when('/home', {
    templateUrl : 'views/home.tpl.html',
    controller : 'homeController'
  })

  .when('/logout', {
    templateUrl : 'views/logout.tpl.html',
    controller : 'logoutController'
  })

  .otherwise({
    redirectTo: '/'
  });

});

app.service('APIService', function ($http, $location) {
  this.processRequest = function(requestData) {
    return $http({
      url: requestData.url,
      data: requestData.inputData,
      method: 'POST'
    })
  };
});
