(function () {
  'use strict';

  angular.module('app.main')
    .controller('MainController', MainController);

  MainController.$inject = ['$localStorage'];

  function MainController($localStorage) {
    var vm = this;
    vm.totalData = [];

    var excelTable = angular.copy($localStorage.excel.table);
    angular.forEach(excelTable, function (excel) {
      var sumData = {
        fileName: excel.fileName, //파일명
        absenceNum: 0,  //부재
        hopeNum: 0, //가망
        successNum: 0, //성공
        failNum: 0, //실패
        happyCallNum: 0 //해피콜
      };
      angular.forEach(excel.shellData, function (shell) {
        if (shell.status !== '-') {
          switch (shell.status) {
            case '부재':
              sumData.absenceNum++;
              break;
            case '가망':
              sumData.hopeNum++;
              break;
            case '성공':
              sumData.successNum++;
              break;
            case '실패':
              sumData.failNum++;
              break;
            case '해피콜':
              sumData.happyCallNum++;
              break;
          }
        }
      });

      vm.totalData.push(sumData);
    });
  }
})();

