'use strict';

angular.module('aeGamesApp')
    .service('gameService', function () {
        var service = this;
        var score = 0;

        service.getScore = function() {
            return score;
        };

        service.calculateScore = function(isCorrect) {
            if(isCorrect) {
                score++;
            }
        };

        return service;
    });
