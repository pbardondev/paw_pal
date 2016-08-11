define('controllers/loginModalController', ['controllers/controllers',
    'constants/formConstants',
    'directives/enrollDirective',
    'services/validationService',
    'services/userService'],
    function(controllers) {
        'use strict';
        controllers.controller('LoginModalCtrl', ['$scope',
             '$rootScope',
             '$http',
             '$log',
             '$uibModalInstance',
             'UserService',
             'ValidationService',
             'formConstants',
             function ($scope,
                       $rootScope,
                       $http,
                       $log,
                       $uibModalInstance,
                       UserService,
                       ValidationService,
                       formConstants,
                       formData) {

                var validateSvc = ValidationService;

                $scope.formData = formData || { email: '', password: ''};

                var loginInfo = {
                   email: $scope.formData.email,
                   password: $scope.formData.password
                };

                $scope.loginSelected = true;

                $scope.toggleLoginSelected = function() {
                    $scope.loginSelected = !$scope.loginSelected;
                };

                $scope.ok = function () {
                    $uibModalInstance.close();
                };

                $scope.login = function() {
                    if ($scope.formData.email === '' || $scope.password === '') {
                        $log.error('user name or password as not provided.');
                    }

                    $http.post('/session',
                        JSON.stringify(loginInfo))
                    .then(function(results) {
                        $log.info('success response from server:\n',
                            JSON.stringify(results));
                        $rootScope.loggedIn = true;

                    }, function(err) {
                        $log.error('error response from new session was ', JSON.stringify(err));
                    });
                };

                $scope.enroll = function() {
                    if (!(validateSvc.validateEmailAddress(loginInfo.email) &&
                        validateSvc.validatePassword(loginInfo.password) &&
                        validateSvc.validatePassword(loginInfo.password))) {
                            $log.error('login info was not entered correctly');
                    }

                    UserService.createUser(loginInfo.email, loginInfo.password)
                    .then(function(result) {
                        $log.info('created user : ', JSON.stringify(loginInfo));
                    }, function(err){
                        $log.err(err);
                    });
                };


                $scope.formData.states = formConstants.states;

                $scope.cancel = function () {
                    $uibModalInstance.dismiss('cancel');
                };
        }]);
});
