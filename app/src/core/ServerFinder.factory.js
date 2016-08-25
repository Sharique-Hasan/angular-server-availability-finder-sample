/**
 * @ngdoc service
 * @name app.core.ServerFinder
 * @description < description placeholder >
 */

(function () {

  'use strict';

  angular
    .module('app.core')
    .factory('ServerFinder', ServerFinder);

  /* @ngInject */
  function ServerFinder($q, $http) {

    var servers = [
      {
        "url": "http://doesNotExist.boldtech.co",
        "priority": 1
      },
      {
        "url": "http://boldtech.co",
        "priority": 7
      },
      {
        "url": "http://offline.boldtech.co",
        "priority": 2
      },
      {
        "url": "http://boldcommunity.com",
        "priority": 4
      },
      {
        "url": "http://www.mocky.io/v2/57bef72a0f00008e0fa6a72a",
        "priority": 5
      },
      {
        "url": "http://www.mocky.io/v2/57bef5f30f00007a0fa6a727",
        "priority": 1
      }
    ]

    return {
      findServer: findServer
    };

    ////////////////////

    /**
     * @ngdoc
     * @name app.core.ServerFinder#findServer
     * @methodOf app.core.ServerFinder
     *
     * @description < description placeholder >
     * @example
     * <pre>
     * ServerFinder.findServer();
     * </pre>
     */


    function findServer() {
      var promises = servers.map(function (server) {
        return resolveRequest($http.get(server.url));
      });
      return $q.all(promises)
        .then(function (response) {
          var available = _(response)
            .filter({ hasError: false })
            .sortBy(function (server) {
              return _.find(servers, { url: server.config.url }).priority;
            })
            .map(function (server) {
              return _.find(servers, { url: server.config.url });
            }).value();

          if(available.length){
            return $q.when(available);
          }
          else{
            return $q.reject(available);            
          }
        });
    }

    function resolveRequest(request) {
      var deferred = $q.defer();
      request.success(function (data, status, headers, config) {
        deferred.resolve({ hasError: !(status >= 200 && status < 300), data: data, status: status, headers: headers, config: config });
      }).error(function (data, status, headers, config) {
        deferred.resolve({ hasError: true, data: data, status: status, headers: headers, config: config });
      });
      return deferred.promise;
    }
  }

} ());
