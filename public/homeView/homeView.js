'use strict';

var homeViewController = angular.module('graphApp.homeView', ['ngRoute']);

homeViewController.controller('HomeCtrl', 
    function($scope, $http) {
        
        $scope.bugsLastSynced = localStorage['bugsLastSynced'] || 'no data synced' ;
        
        $scope.sync = function($event) {
            console.log('syncing');

            console.log('clearing local storage');
            localStorage['bugs'] = undefined;
            
            $http.get('/sync')
                .success(function(data, status, headers, config) {
                    localStorage['bugs'] = JSON.stringify(data);
                    localStorage['bugsLastSynced'] = new Date();
                    $scope.bugsLastSynced = localStorage['bugsLastSynced'];
                })
                .error(function(data, status, headers, config) {

                })
        }
    }
);