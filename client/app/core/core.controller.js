(function () {
  'use strict';

  angular.module('app.core')
    .controller('AppController', AppController);

  AppController.$inject = ['$rootScope', '$state', '$localStorage'];

  function AppController($rootScope, $state, $localStorage) {
    var vm = this;
    vm.stateGo = stateGo;
    vm.manuArr = [
      {state: 'app.excel.list', name: 'Excel', active: false}
    ];

    function stateGo(state) {
      $state.go(state);
    }

    //코멘트
    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      var stateName = toState.name;
      var stateArr = stateName.split('.');
      if (stateArr.length > 0) {
        angular.forEach(vm.manuArr, function (value) {
          value.active = value.state.split('.')[1] === stateArr[1];
        });
      }
    });

    if ($localStorage.excel === undefined || $localStorage.excel === null || $localStorage.excel === '') {
      $localStorage.excel = {
        table: []
      }
    }
  }
})();

