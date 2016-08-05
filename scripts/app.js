var app = angular.module('touchpoint', ['ngAnimate', 'ngAria', 'ngMaterial','ngMessages','ngRoute']);

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
