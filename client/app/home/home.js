'use strict';

angular.module('aeGamesApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                templateUrl: 'app/home/view.html',
                controller: 'HomeCtrl',
                controllerAs: 'HomeCtrl'
            });
    });