(function () {
  'use strict';

  angular.module('app.excel')
    .controller('BusinessSearchModalController', BusinessSearchModalController);

  BusinessSearchModalController.$inject = ['$uibModalInstance', 'items'];

  function BusinessSearchModalController($uibModalInstance, items) {
    var vm = this;
    vm.cancel = cancel;
    vm.goDaumMap = goDaumMap;
    console.log('items', items);

    vm.items = items;

    function cancel() {
      $uibModalInstance.close();
    }

    function goDaumMap(url) {
      if (url === undefined) {
        url = 'http://map.daum.net/?q=' + items.searchName;
      }
      window.open(url);
    }
  }
})();
