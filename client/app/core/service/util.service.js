(function () {
  'use strict';

  angular.module('app.core')
    .service('Util', UtilService);

  UtilService.$inject = ['$uibModal'];

  function UtilService($uibModal) {
    var service = this;
    service.numberToString = numberToString;
    service.getFullTime = getFullTime;
    service.alert = alert;

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

    function alert(title, content) {
      var modalData = {
        title: title,
        content: content
      };
      var modalInstance = $uibModal.open({
        animation: true,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: 'app/core/service/alert/alert.modal.html',
        controller: 'AlertModalController',
        controllerAs: 'vm',
        size: 'sm',
        resolve: {
          items: function () {
            return modalData;
          }
        }
      });

      return modalInstance.result;
    }
  }
})();

