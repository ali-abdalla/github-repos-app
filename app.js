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
    })
    .when('/repos/:numberOfRepos', {
      templateUrl: 'pages/repos.html',
      controller: 'reposController'
    })
});

// Services
githubReposApp.service('userService', function() {
  this.username = '';
  this.repos = [];
});

// Controllers
githubReposApp.controller('homeController', ['$scope', 'userService', function($scope, userService) {
  $scope.username = userService.username;
  $scope.$watch('username', function() {
    userService.username = $scope.username;
  });
}]);

githubReposApp.controller('reposController', ['$scope', '$http', '$routeParams', 'userService', function($scope, $http, $routeParams, userService) {
  $scope.username = userService.username;
  $scope.numberOfRepos = $routeParams.numberOfRepos || 10;
  $scope.repos = [];

  if ($scope.username !== "") {
    $http({
      method: 'GET',
      url: 'https://api.github.com/users/' + $scope.username + '/repos'
    }).then(function successCallback(response) {
      // this callback will be called asynchronously
      // when the response is available
      $scope.repos = response.data;
      console.log($scope.repos);
      // $scope.$watch('repos', function() {
      //   userService.repos = $scope.repos;
      // });
      // console.log(userService.repos);
      
    }, function errorCallback(response) {
      // called asynchronously if an error occurs
      // or server returns response with an error status.
      $scope.repos = [];        
    });
  }
}]);