(function () {
  'use strict';

  angular.module('app.chart')
    .controller('ChartListController', ChartListController);

  ChartListController.$inject = [];

  function ChartListController() {
    var vm = this;
    console.log('ChartListController');
  }
})();

