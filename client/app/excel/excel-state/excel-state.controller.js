(function () {
  'use strict';

  angular.module('app.excel')
    .controller('ExcelStateController', ExcelStateController);

  ExcelStateController.$inject = ['$rootScope', '$uibModalInstance', 'items'];

  function ExcelStateController($rootScope, $uibModalInstance, items) {
    var vm = this;
    vm.changeStatusName = changeStatusName;
    vm.cancel = cancel;

    vm.items = items;

    function changeStatusName(statusName) {
      var data = {
        index: items.index,
        statusName: statusName
      };
      $rootScope.$broadcast('StatusNameChange', data);
      cancel();
    }

    function cancel() {
      $uibModalInstance.close();
    }
  }
})();
