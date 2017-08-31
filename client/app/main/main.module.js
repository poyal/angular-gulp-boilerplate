(function () {
  'use strict';

  angular
    .module('app.main', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('app.main', {
          url: '/main',
          templateUrl: 'app/main/main.html',
          controller: 'MainController',
          controllerAs: 'vm'
        });
    }]);
})();
