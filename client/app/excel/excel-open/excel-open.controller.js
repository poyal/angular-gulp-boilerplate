(function () {
  'use strict';

  angular.module('app.excel')
    .controller('ExcelOpenController', ExcelOpenController);

  ExcelOpenController.$inject = ['$rootScope', '$uibModalInstance', '$localStorage'];

  function ExcelOpenController($rootScope, $uibModalInstance, $localStorage) {
    var vm = this;
    vm.changeExcel = changeExcel;
    vm.cancel = cancel;

    vm.excels = angular.copy($localStorage.excel.table);

    function changeExcel(excel) {
      $rootScope.$broadcast('ExcelLoad', excel);
      cancel();
    }

    function cancel() {
      $uibModalInstance.close();
    }
  }
})();
