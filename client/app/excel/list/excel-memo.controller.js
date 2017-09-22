(function () {
  'use strict';

  angular.module('app.excel')
    .controller('ExcelMemoController', ExcelMemoController);

  ExcelMemoController.$inject = ['$rootScope', '$uibModalInstance', 'items'];

  function ExcelMemoController($rootScope, $uibModalInstance, items) {
    var vm = this;
    vm.changeMemo = changeMemo;
    vm.cancel = cancel;

    vm.items = items;
    vm.memo = angular.copy(items.shellData.memo);

    function changeMemo() {
      var data = {
        index: items.index,
        memo: vm.memo
      };
      $rootScope.$broadcast('MemoChange', data);
      cancel();
    }

    function cancel() {
      $uibModalInstance.close();
    }
  }
})();
