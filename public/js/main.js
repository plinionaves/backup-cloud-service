(function() {

  'use strict';

  angular.module('kiko', ['ngRoute'])

    .config(function($routeProvider) {

      $routeProvider
        .when('/', {templateUrl: 'partials/home.html', controller: 'HomeController', controllerAs: 'home'})
        .otherwise({redirectTo: '/'});

    });

})();
