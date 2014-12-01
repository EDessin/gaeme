'use strict';

angular.module('aeGamesApp')
    .controller('DisOrDatCtrl', function ($scope, $http) {
        $http.get('/api/disordat/question').success(function (question) {
            $scope.q = question;
        });
    });
