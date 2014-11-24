'use strict';

angular.module('aeGameApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/disordat/view.html',
        controller: 'DisOrDatCtrl'
      });
  });