'use strict';

angular.module('aeGamesApp')
    .service('ResourceService', function ($http, $q, $log) {
        var service = this;

        service.getResource = function (uri) {
            var deferred = $q.defer();
            $http.get(uri).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                $log.error('get operation for uri ' + uri + ' failed');
                deferred.reject('get operation for uri ' + uri + ' failed');
            });
            return deferred.promise;
        };

        service.postResource = function (uri, data) {
            var deferred = $q.defer();
            $http.post(uri, data).success(function (data) {
                deferred.resolve(data);
            }).error(function () {
                $log.error('get operation for uri ' + uri + ' failed');
                deferred.reject('get operation for uri ' + uri + ' failed');
            });
            return deferred.promise;
        };

        return service;
    });
