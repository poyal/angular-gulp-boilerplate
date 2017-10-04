(function () {
  'use strict';

  angular.module('app.excel')
    .controller('ExcelListController', ExcelListController);

  ExcelListController.$inject = ['$scope', '$uibModal'];

  function ExcelListController($scope, $uibModal) {
    var vm = this;
    var excelOpenFlag = false;
    vm.tableData = {};

    vm.shellClick = shellClick;

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
              templateUrl: 'app/excel/business-search/business-search.modal.html',
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
        var googleSearchData = shell['업체'] + '+' + shell['대표'];
        var googleSearchUrl = 'https://www.google.co.kr/search?q=' + googleSearchData;
        window.open(googleSearchUrl);
      }
    }
  }
})();