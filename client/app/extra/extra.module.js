(function () {
  'use strict';

  angular
    .module('app.extra', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('app.extra', {
          url: '/extra',
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('app.extra.list', {
          url: '/list',
          templateUrl: 'app/extra/list/list.html',
          controller: 'ExtraListController',
          controllerAs: 'vm'
        });
    }]);
})();