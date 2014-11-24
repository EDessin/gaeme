'use strict';

angular.module('aeGameApp')
    .controller('DisOrDatCtrl', function ($scope, $http) {
        $http.get('/api/disordat/question').success(function (question) {
            $scope.q = question;
        });
    });
