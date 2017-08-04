define('mocks/userService', ['mocks'], function(mocks) {
    'use strict';
    mocks.service('UserService', ['$q', function($q) {
        this.createUser = function() {
            console.log('creating user...');
        };

        this.loginUser = function() {
            var deferred = $q.defer();
            console.log('user logging in...');
            deferred.resolve();
            return deferred.promise;
        };
    }]);
});
