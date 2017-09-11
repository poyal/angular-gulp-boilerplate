(function () {
  'use strict';

  angular.module('app.core')
    .controller('AppController', AppController);

  AppController.$inject = ['$rootScope', '$state'];

  function AppController($rootScope, $state) {
    var vm = this;
    vm.stateGo = stateGo;
    vm.manuArr = [
      {state: 'app.chart.list', name: 'Chart', active: false},
      {state: 'app.extra.list', name: 'Extra', active: false}
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
      }
    );
  }
})();

