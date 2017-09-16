(function () {
  'use strict';

  angular
    .module('app.excel', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('app.excel', {
          url: '/extra',
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('app.excel.list', {
          url: '/list',
          templateUrl: 'app/excel/list/list.html',
          controller: 'ExcelListController',
          controllerAs: 'vm'
        });
    }]);
})();