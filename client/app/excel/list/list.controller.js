(function () {
  'use strict';

  angular.module('app.excel')
    .controller('ExcelListController', ExcelListController);

  ExcelListController.$inject = ['$scope', '$uibModal', '$localStorage', 'Util'];

  function ExcelListController($scope, $uibModal, $localStorage, Util) {
    var vm = this;
    var excelOpenFlag = false;
    vm.tableData = {};

    vm.shellClick = shellClick;
    vm.statusChange = statusChange;
    vm.memoChange = memoChange;
    vm.jsonSave = jsonSave;
    vm.jsonDelete = jsonDelete;

    $(document).on('change', ':file', function () {
      var input = $(this),
        numFiles = input.get(0).files ? input.get(0).files.length : 1,
        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
      input.trigger('fileselect', [numFiles, label]);
    });

    // We can watch for our custom `fileselect` event like this
    $(document).ready(function () {
      $(':file').on('fileselect', function (event, numFiles, label) {

        var input = $(this).parents('.input-group').find(':text'),
          log = numFiles > 1 ? numFiles + ' files selected' : label;

        if (input.length) {
          input.val(log);
        } else {
          if (log) alert(log);
        }
      });
    });

    $scope.$on('ExcelDataParse', function ($event, data) {
      angular.forEach(data.shellData, function (value) {
        var name = value['업체'];
        if (name !== undefined) {
          if (name.substr(name.length - 1, 1) === ' ') {
            value['업체'] = name.substr(0, name.length - 1);
          }
        }

        if (value.status === null || value.status === undefined || value.status === '') {
          value.status = '-';
        }

        if (value.memo === null || value.memo === undefined || value.memo === '') {
          value.memo = '';
        }

        delete value['undefined'];
      });

      vm.tableData = angular.copy(data);
      excelOpenFlag = true;
      $scope.$apply();
    });

    function shellClick(field, shell) {
      if (field === '업체') {
        var ps = new daum.maps.services.Places();
        ps.keywordSearch(shell['업체'], function (data, status) {
          if (status === daum.maps.services.Status.OK) {
            var modalData = {
              searchName: shell['업체'],
              searchAddr: shell['주소'],
              searchData: data
            };
            var modalInstance = $uibModal.open({
              animation: true,
              ariaLabelledBy: 'modal-title',
              ariaDescribedBy: 'modal-body',
              templateUrl: 'app/excel/list/business-search.modal.html',
              controller: 'BusinessSearchModalController',
              controllerAs: 'vm',
              size: 'lg',
              resolve: {
                items: function () {
                  return modalData;
                }
              }
            });
          } else if (status === daum.maps.services.Status.ZERO_RESULT) {
            var daumSearchUrl = 'http://map.daum.net/?q=' + shell['업체'];
            window.open(daumSearchUrl);
          }
        });
      } else if (field === '대표') {
        var googleSearchData = shell['업체'] + '+' + shell['대표'] + '010';
        var googleSearchUrl = 'https://www.google.co.kr/search?q=' + googleSearchData;
        window.open(googleSearchUrl);
      }
    }

    /** 상태 변경 POPUP 오픈 */
    function statusChange(index) {
      var modalData = {
        index: index,
        shellData: vm.tableData.shellData[index]
      };
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/excel/list/excel-state.modal.html',
        controller: 'ExcelStateController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          items: function () {
            return modalData;
          }
        }
      });
    }

    /** 상태 변경 CALL BACK */
    $scope.$on('StatusNameChange', function ($event, data) {
      vm.tableData.shellData[data.index].status = data.statusName;
    });

    /** 메모 변경 POPUP 오픈 */
    function memoChange(index) {
      var modalData = {
        index: index,
        shellData: vm.tableData.shellData[index]
      };
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/excel/list/excel-memo.modal.html',
        controller: 'ExcelMemoController',
        controllerAs: 'vm',
        size: 'lg',
        resolve: {
          items: function () {
            return modalData;
          }
        }
      });
    }

    $scope.$on('MemoChange', function ($event, data) {
      vm.tableData.shellData[data.index].memo = data.memo;
    });

    function jsonSave() {
      if (excelOpenFlag) {
        console.log('excel_' + Util.getFullTime());
        if (vm.tableData.fileName === '' || vm.tableData.fileName === null || vm.tableData.fileName === undefined) {
          vm.tableData.fileName = 'excel_' + Util.getFullTime();
        }
        console.log(vm.tableData);
        $localStorage.excel.table.push(vm.tableData);
        // $localStorage.excel = vm.tableData;
      }
    }

    function jsonDelete() {
      console.log($localStorage.excel);
    }
  }
})();