// Modules
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// Routes
weatherApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'homeController'
    })
    .when('/forecast', {
      templateUrl: 'pages/forecast.html',
      controller: 'forecastController'
    });
});

// Services
weatherApp.service('cityService', function() {
  this.city = 'Cairo, Egypt';
});

// Controllers
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService) {
  $scope.city = cityService.city;
  $scope.$watch('city', function() {
    cityService.city = $scope.city;
  });
}]);

weatherApp.controller('forecastController', ['$scope', 'cityService', function($scope, cityService) {
  $scope.city = cityService.city;
}]);

window.addEventListener('hashchange', function() {
  console.log(window.location.hash);
})