'use strict';

angular.module('aeGamesApp')
    .controller('DisOrDatCtrl', function ($scope, resourceService, gameService, $timeout, $q) {
        var controller = this;
        controller.getScore = getScore;
        controller.submitAnswer = submitAnswer;
        controller.loadQuestion = loadQuestion;

        init();

        function init() {
            $scope.firstQuestionLoaded = false;
            loadQuestion().then(function() {
                $scope.firstQuestionLoaded = true;
            });
        }

        function submitAnswer(questionId, answerId) {
            var dataToSubmit = {
                questionId: questionId,
                answerId: answerId
            };
            resourceService.postResource('/api/disordat/answer', dataToSubmit).then(function (isCorrect) {
                $scope.isCorrect = isCorrect;
                gameService.calculateScore(isCorrect);
                loadQuestion();
            });
        }

        function getScore() {
            return gameService.getScore();
        }

        function loadQuestion() {
            var deferred = $q.defer();

            $scope.data = null;
            $scope.loading = true;

            $timeout(function() {
                getQuestion().then(function() {
                    $scope.loading = false;
                    $scope.loadingError = false;
                },function() {
                    $scope.loading = false;
                    $scope.loadingError = true;
                }).finally(function() {
                    deferred.resolve();
                });
            }, 1500);

            return deferred.promise;
        }

        function getQuestion() {
            var deferred = $q.defer();

            resourceService.getResource('/api/disordat/question').then(function (data) {
                $scope.question = data;
                if(data.imageUrl) {
                    //TODO get image
                    resourceService.getResource(data.imageUrl).finally(function(data) {
                        deferred.resolve();
                    });
                } else {
                    deferred.resolve();
                }
            }, function() {
                deferred.reject();
            });

            return deferred.promise;
        }
    });
