(function () {
  'use strict';

  angular.module('app.core')
    .service('Util', UtilService);

  UtilService.$inject = [];

  function UtilService() {
    var service = this;
    service.numberToString = numberToString;
    service.getFullTime = getFullTime;

    function numberToString(number) {
      var numberStr = number.toString();

      if (numberStr.length === 0) {
        numberStr = '00';
      } else if (numberStr.length === 1) {
        numberStr = '0' + numberStr;
      }
      return numberStr;
    }

    function getFullTime() {
      var date = new Date();
      var StringDate = numberToString(date.getFullYear()) + numberToString(date.getMonth() + 1) + numberToString(date.getDate()) +
        numberToString(date.getHours()) + numberToString(date.getMinutes()) + numberToString(date.getSeconds());
      return StringDate;
    }
  }
})();

