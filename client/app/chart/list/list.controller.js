(function () {
  'use strict';

  angular.module('app.chart')
    .controller('ChartListController', ChartListController);

  ChartListController.$inject = ['$state'];

  function ChartListController($state) {
    var vm = this;

    vm.stateGo = stateGo;
    vm.chartArr = [
      {name: 'line', state: 'app.chart.line'},
      {name: 'cumulative', state: 'app.chart.cumulative'}
    ];

    function stateGo(state) {
      $state.go(state);
    }
  }
})();

