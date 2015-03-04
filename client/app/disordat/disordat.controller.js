'use strict';

angular.module('aeGamesApp')
    .controller('DisOrDatCtrl', function ($scope, ResourceService, UserService, $timeout, $q) {
        var controller = this;
        controller.getScore = getScore;
        controller.isNewGame = isNewGame;
        controller.startGame = startGame;
        controller.getUserName = getUserName;
        controller.submitAnswer = submitAnswer;
        controller.loadQuestion = loadQuestion;

        var score;
        var isNewGame;

        startGame();

        function startGame() {
            score = 0;
            isNewGame = true;
            loadQuestion().then(function () {
                isNewGame = false;
            });
        }

        function getScore() {
            return score;
        }

        function isNewGame() {
            return isNewGame;
        }

        function getUserName() {
            return UserService.getUserName();
        }

        function submitAnswer(questionId, answerId) {
            var dataToSubmit = {
                questionId: questionId,
                answerId: answerId
            };
            ResourceService.postResource('/api/disordat/answer', dataToSubmit).then(function (isCorrect) {
                $scope.isCorrect = isCorrect;
                if (isCorrect) {
                    score++;
                }
                loadQuestion();
            });
        }

        function loadQuestion() {
            var deferred = $q.defer();

            $scope.data = null;
            $scope.loading = true;

            $timeout(function () {
                getQuestion().then(function () {
                    $scope.loading = false;
                    $scope.loadingError = false;
                }, function () {
                    $scope.loading = false;
                    $scope.loadingError = true;
                }).finally(function () {
                    deferred.resolve();
                });
            }, 1500);

            return deferred.promise;
        }

        function getQuestion() {
            var deferred = $q.defer();

            ResourceService.postResource('/api/disordat/question', {user: 'glenn.dejaeger'}).then(function (data) {
                $scope.question = data;
                if (data.imageUrl) {
                    ResourceService.getResource(data.imageUrl).finally(function (data) {
                        //always resolve, cors error will be thrown, it's needed to indicate that image has loaded
                        deferred.resolve();
                    });
                } else {
                    deferred.resolve();
                }
            }, function () {
                deferred.reject();
            });

            return deferred.promise;
        }
    });
