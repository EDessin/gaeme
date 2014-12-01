'use strict';

angular.module('aeGamesApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('disordat', {
        url: '/disordat',
        templateUrl: 'app/disordat/view.html',
        controller: 'DisOrDatCtrl'
      });
  });