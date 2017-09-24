(function () {
  'use strict';

  angular.module('app.excel')
    .controller('ExcelDeleteController', ExcelDeleteController);

  ExcelDeleteController.$inject = ['$uibModalInstance', '$localStorage'];

  function ExcelDeleteController($uibModalInstance, $localStorage) {
    var vm = this;
    vm.deleteExcel = deleteExcel;
    vm.cancel = cancel;

    vm.excels = angular.copy($localStorage.excel.table);

    function deleteExcel(index) {
      $localStorage.excel.table.splice(index, 1);
      cancel();
    }

    function cancel() {
      $uibModalInstance.close();
    }
  }
})();
