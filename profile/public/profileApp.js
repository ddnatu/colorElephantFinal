var app = angular.module('myApp', ["ngRoute"]);

    app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'profile.html',
            controller: 'profileCtrl'  
        })
        .when('/profile', {
            templateUrl: 'details.html',
            controller: 'detailsController',
        })
        .when('/user', {
            templateUrl: 'user.html',
            controller: 'userController'
        });

        // configure html5 to get links working on jsfiddle
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });

    });
    app.controller('detailsController', function($scope, $routeParams, MyService) {
        $scope.params = $routeParams;
            console.log('adming registers', $scope.adminUser);
			$scope.getProfileDetails = function(){            
				var profileDetailsDefer = MyService.getProfileDetails();
				profileDetailsDefer.then(function(data){
					console.log('adminLoginSuccess', data);
				},function(error){
					console.log('adminLoginError', error);
				});
			}
    });