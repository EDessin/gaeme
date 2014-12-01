'use strict';

angular.module('aeGamesApp')
    .controller('DisOrDatCtrl', function ($scope, resourceService, gameService) {
        $scope.getQuestion = function () {
            resourceService.getResource('/api/disordat/question').then(function (data) {
                $scope.data = data;
            });
        };

        $scope.submitAnswer = function (questionId, answerId) {
            var dataToSubmit = {
                question_id: questionId,
                answer_id: answerId
            };
            resourceService.postResource('/api/disordat/answer', dataToSubmit).then(function (result) {
                gameService.calculateScore(result);
                $scope.getQuestion();
            });
        };

        $scope.getScore = function() {
            return gameService.getScore();
        };

        $scope.getQuestion();
    });
