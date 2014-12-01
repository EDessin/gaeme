'use strict';

angular.module('aeGamesApp')
    .service('resourceService', function ($http, $q, $log) {
        var service = this;

        service.getResource = function (uri) {
            var deferred = $q.defer();
            $http.get(uri).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                $log.error("get operation for uri " + uri + " failed");
                deferred.reject("get operation for uri " + uri + " failed");
            });
            return deferred.promise;
        };

        service.postResource = function (uri, data) {
            var deferred = $q.defer();
            $http.post(uri, data).success(function (data, status, headers, config) {
                deferred.resolve(data);
            }).error(function (data, status, headers, config) {
                $log.error("get operation for uri " + uri + " failed");
                deferred.reject("get operation for uri " + uri + " failed");
            });
            return deferred.promise;
        };

        return service;
    });
