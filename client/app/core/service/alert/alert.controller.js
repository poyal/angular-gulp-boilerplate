(function () {
  'use strict';

  angular.module('app.core')
    .controller('AlertModalController', AlertModalController);

  AlertModalController.$inject = ['$uibModalInstance', 'items'];

  function AlertModalController($uibModalInstance, items) {
    var vm = this;
    vm.cancel = cancel;

    vm.items = items;

    function cancel() {
      $uibModalInstance.close(false);
    }
  }
})();
