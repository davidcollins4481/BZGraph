'use strict';

angular.module('graphApp.homeView', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/homeView', {
        templateUrl: 'homeView/homeView.html',
        controller: 'HomeCtrl'
    });
}])

.controller('HomeCtrl', [function() {

}]);