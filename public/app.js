'use strict';

// Declare app level module which depends on views, and components
angular.module('graphApp', [
    'ngRoute',
    'graphApp.homeView'
]).
    config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/homeView', {
                templateUrl: 'homeView/homeView.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/homeView'
            });
    }]);