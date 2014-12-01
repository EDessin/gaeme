'use strict';

angular.module('aeGamesApp')
    .controller('DisOrDatCtrl', function ($scope, resourceService, gameService, $timeout) {
        var loadNextQuestion = function(timeout) {
            $scope.data = null;
            $scope.loading = true;
            $timeout(function () {
                $scope.getQuestion();
                $scope.loading = false;
            }, timeout);
        };

        $scope.getQuestion = function () {
            resourceService.getResource('/api/disordat/question').then(function (data) {
                $scope.data = data;
            });
        };

        $scope.submitAnswer = function (questionId, answerId) {
            var dataToSubmit = {
                questionId: questionId,
                answerId: answerId
            };
            resourceService.postResource('/api/disordat/answer', dataToSubmit).then(function (isCorrect) {
                $scope.isCorrect = isCorrect;
                console.log(isCorrect);
                gameService.calculateScore(isCorrect);
                loadNextQuestion(1500);
            });
        };

        $scope.getScore = function () {
            return gameService.getScore();
        };

        loadNextQuestion(0);
    });
