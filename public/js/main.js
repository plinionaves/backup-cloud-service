(function() {

  'use strict';

  angular.module('kiko', ['ngRoute', 'ngFileUpload'])

    .config(['$routeProvider', function($routeProvider) {

      $routeProvider
        .when('/', {templateUrl: 'partials/home.html', controller: 'HomeController', controllerAs: 'home'})
        .otherwise({redirectTo: '/'});

    }]);

})();
