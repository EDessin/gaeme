'use strict';

angular.module('aeGamesApp')
    .service('UserService', function ($location, $window) {
        var currentUserName;

        return {
            getUserName: getUserName,
            setUserName: setUserName
        };

        function getUserName() {
            if (!currentUserName) {
                currentUserName = $window.localStorage.getItem('userName');
            }
            return currentUserName;
        }

        function setUserName(userName) {
            $window.localStorage.setItem('userName', userName);
            currentUserName = userName;
        }
    });
