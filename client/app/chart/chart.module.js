(function () {
  'use strict';

  angular
    .module('app.chart', ['nvd3'])
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
        })
        .state('app.chart.line', {
          url: '/line',
          templateUrl: 'app/chart/chart/chart.html',
          controller: 'ChartLineController',
          controllerAs: 'vm'
        })
        .state('app.chart.cumulative', {
          url: '/cumulative',
          templateUrl: 'app/chart/chart/chart.html',
          controller: 'ChartCumulativeController',
          controllerAs: 'vm'
        });
    }]);
})();