// Modules
var githubReposApp = angular.module('githubReposApp', ['ngRoute', 'ngResource']);

// Routes
githubReposApp.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'homeController'
    })
    .when('/repos', {
      templateUrl: 'pages/repos.html',
      controller: 'reposController'
    });
});

// Services
githubReposApp.service('userService', function() {
  this.username = '';
});

// Controllers
githubReposApp.controller('homeController', ['$scope', 'userService', function($scope, userService) {
  $scope.username = userService.username;
  $scope.$watch('username', function() {
    userService.username = $scope.username;
  });
}]);

githubReposApp.controller('reposController', ['$scope', 'userService', function($scope, userService) {
  $scope.username = userService.username;
}]);

window.addEventListener('hashchange', function() {
  console.log(window.location.hash);
})