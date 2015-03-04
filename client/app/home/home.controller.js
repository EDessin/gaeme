'use strict';

angular.module('aeGamesApp')
    .controller('HomeCtrl', function (UserService) {
        var controller = this;
        controller.setUserName = setUserName;
        controller.getUserName = getUserName;

        function setUserName(userName) {
            if (userName) {
                UserService.setUserName(userName);
            }
        }

        function getUserName() {
            return UserService.getUserName();
        }
    });
