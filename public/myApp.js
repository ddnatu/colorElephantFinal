var app = angular.module('myApp', ["ngRoute"]);

    app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'user.html',
            controller: 'myCtrl'  
        })
        .when('/admin', {
            templateUrl: 'admin.html',
            controller: 'adminController',
            controllerAs:'admCtrl',
            resolve: {
                // I will cause a 1 second delay
                delay: function($q, $timeout) {
                    var delay = $q.defer();
                    $timeout(delay.resolve, 500);
                    return delay.promise;
                }
            }
        })
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'registerController'
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
    app.controller('adminController', function($scope, $routeParams, MyService) {
        $scope.params = $routeParams;
        $scope.adminUser = {};
        $scope.loginFlag = false;
        $scope.registrationFlag = true;

        $scope.adminSwitchMode = function(){
            $scope.loginFlag = !$scope.loginFlag;
            $scope.registrationFlag = !$scope.registrationFlag;
        }

        $scope.adminRegisters = function(){
            // console.log('admin registers', $scope.adminUser);
            var adminRegDefer = MyService.adminRegisters($scope.adminUser);
            adminRegDefer.then(function(data){
                console.log('adminRegistrationSuccess', data);
            },function(error){
                console.log('adminRegistrationError', error);
            });
        }
        $scope.adminLogsIn   = function(){
            console.log('adming Logs In', $scope.adminUser);
            var adminLoginDefer = MyService.adminLogsIn();
            adminLoginDefer.then(function(data){
                console.log('adminLoginSuccess', data);
            },function(error){
                console.log('adminLoginError', error);
            });
        }
    });
    app.controller('userController', function($scope, $routeParams) {
        $scope.name = 'userController';
        $scope.params = $routeParams;
        console.log('user Controller');
    });
    app.controller('registerController', function($scope, $routeParams, MyService) {
        $scope.name = 'registerController';
        $scope.params = $routeParams;
        // console.log('$scope.params', $scope.params.time);
        // console.log('register Controller');
        var registerVerifyDefer = MyService.verifyRegistration($scope.params.time);
        registerVerifyDefer.then(function(data){
            console.log('reg verify success', data);
            window.location = "http://localhost:3000/";
            
        },function(error){
            console.log(error);
        })
    });