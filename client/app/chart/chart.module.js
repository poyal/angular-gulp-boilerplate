(function () {
  'use strict';

  angular
    .module('app.chart', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('app.chart', {
          url: '/chart',
          abstract: true,
          template: '<div ui-view></div>'
        })
        .state('app.chart.list', {
          url: '/list',
          templateUrl: 'app/chart/list/list.html',
          controller: 'ChartListController',
          controllerAs: 'vm'
        });
    }]);
})();