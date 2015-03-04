'use strict';

angular.module('aeGamesApp')
    .controller('UserCtrl', function ($location, UserService) {
        var controller = this;
        controller.setUserName = setUserName;

        function setUserName(userName) {
            if (userName) {
                UserService.setUserName(userName);
                $location.path('/');
            }
        }
    });
