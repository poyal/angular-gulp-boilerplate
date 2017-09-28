(function () {
  'use strict';

  angular.module('app.excel')
    .directive('importSheetJs', SheetJSImportDirective);

  SheetJSImportDirective.$inject = ['$rootScope'];

  /* @ngInject */
  function SheetJSImportDirective($rootScope) {
    return {
      scope: {opts: '='},
      link: function ($scope, $elm, $attrs) {
        $elm.on('change', function (changeEvent) {
          var reader = new FileReader();

          reader.onload = function (e) {
            /* read workbook */
            var bstr = e.target.result;
            var wb = XLSX.read(bstr, {type: 'binary'});

            /* grab first sheet */
            var wsname = wb.SheetNames[0];
            var ws = wb.Sheets[wsname];

            /* grab first row and generate column headers */
            var aoa = XLSX.utils.sheet_to_json(ws, {header: 1, raw: false});
            var cols = [];
            for (var i = 0; i < aoa[0].length; ++i) cols[i] = {field: aoa[0][i]};

            /* generate rest of the data */
            var data = [];
            for (var r = 1; r < aoa.length; ++r) {
              data[r - 1] = {};
              for (i = 0; i < aoa[r].length; ++i) {
                if (aoa[r][i] === null) continue;
                data[r - 1][aoa[0][i]] = aoa[r][i];
              }
            }

            var excelData = {
              columnDef: cols,
              shellData: data
            };

            $rootScope.$broadcast('ExcelDataParse', excelData);

          };

          reader.readAsBinaryString(changeEvent.target.files[0]);
        });
      }
    };
  }
})();