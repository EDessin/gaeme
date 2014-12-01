'use strict';

angular.module('aeGamesApp')
    .service('gameService', function ($log) {
        var service = this;
        var score = 0;

        service.getScore = function() {
            return score;
        };

        service.calculateScore = function(correct) {
            if(correct) {
                score++;
            }
        };

        return service;
    });
