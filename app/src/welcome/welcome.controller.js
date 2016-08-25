/**
 * @ngdoc controller
 * @name app.welcome.controller:Welcome
 * @description Welcome controller which typically is useless and you are going to delete it
 */

(function(){

  'use strict';

  angular.module('app.welcome')
    .controller('Welcome', Welcome);

  /* @ngInject */
  function Welcome(ServerFinder){
    var vm = this;

    vm.welcomeMessage = 'Available Online server list';
    vm.testFunction = testFunction;

    ServerFinder.findServer()
      .then(function(online){
        vm.onlineServers = online;
      }, function(){
        vm.error = 'No servers are online';
      });




    /////////////////////

    /**
     * @ngdoc method
     * @name testFunction
     * @param {number} num number is the number of the number
     * @methodOf app.welcome.controller:Welcome
     * @description
     * My Description rules
     */

    function testFunction(num){
      console.info('This is a test function number ' + num);
    }
  }

}());
