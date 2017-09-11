(function () {
  'use strict';

  angular.module('app')
    .run(appConfig)
    .constant('API', {
      url: 'NONE'
    });

  function appConfig() {
  }
})();
