var app = angular.module('myApp', ["ngRoute"]);

    app.config(function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'user.html',
            controller: 'userController'  
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
        .when('/register', {
            templateUrl: 'profile.html',
            controller: 'profileController'
        })

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
            var adminLoginDefer = MyService.adminLogsIn($scope.adminUser);
            adminLoginDefer.then(function(data){
                console.log('adminLoginSuccess', data);
            },function(error){
                console.log('adminLoginError', error);
            });
        }
    });
    app.controller('userController', function($scope, $routeParams, MyService) {
        $scope.automaticCaptchaCode = 7777;
        $scope.enteredCaptchaCode;
        var val = Math.floor(1000 + Math.random() * 9000);
        $scope.automaticCaptchaCode = val;
        $scope.master = {};
        $scope.update = function(user) {
            $scope.master = angular.copy(user);
            var userSubFormDefer = MyService.userSubmitsForm($scope.master);
            userSubFormDefer.then(function(data){
                console.log('successSubmitForm', data);
            },function(error){
                console.log('errorSubmitForm', error);
            })
        };
        $scope.reset = function(form) {
            if (form) {
                form.$setPristine();
                form.$setUntouched();
            }
            $scope.user = angular.copy($scope.master);
        };
        $scope.setFiles = function(element) {
            $scope.$apply(function($scope) {
                console.log('files:', element.files);
                // Turn the FileList object into an Array
                    $scope.files = []
                    for (var i = 0; i < element.files.length; i++) {
                        $scope.files.push(element.files[i]);
                    }
                $scope.progressVisible = false;
            });
        };
        $scope.saveFile = function(){
            var uploadDefer = MyService.uploadAttachment($scope.files[0]);
            uploadDefer.then(function(data){
                console.log('data', data);
            }, function(error){
                console.log('file upload error', error);
            });
        }
        $scope.reset();
        $scope.checkIfDuplicate = function(testEmail){
            console.log(testEmail);
            var checkIfDuplicateDefer = MyService.checkIfDuplicate(testEmail);
            checkIfDuplicateDefer.then(function(data){
                console.log('checkIfDuplicateResult', data);
            }, function(error){
                console.log('Duplicate eMail Service error', error);
            });
        }
    });
    app.controller('registerController', function($scope, $routeParams, MyService) {
        $scope.name = 'registerController';
        $scope.params = $routeParams;
        // console.log('$scope.params', $scope.params.time);
        // console.log('register Controller');
        var registerVerifyDefer = MyService.verifyRegistration($scope.params.time);
        registerVerifyDefer.then(function(data){
            console.log('reg verify success', data);
            window.location = "http://localhost:3000/profile";
            
        },function(error){
            console.log(error);
        })
    });
    app.controller('profileController', function($scope, $routeParams, MyService) {
        $scope.name = 'profileController';
        $scope.params = $routeParams;
        // console.log('$scope.params', $scope.params.time);
        // console.log('register Controller');
        var getDetailsDefer = MyService.getDetails(email);
        getDetailsDefer.then(function(data){
            console.log('reg verify success', data);
            
        },function(error){
            console.log(error);
        })
    });
