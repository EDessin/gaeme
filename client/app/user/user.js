'use strict';

angular.module('aeGamesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/user',
                templateUrl: 'app/user/view.html',
                controller: 'UserCtrl',
                controllerAs: 'UserCtrl'
            });
    });