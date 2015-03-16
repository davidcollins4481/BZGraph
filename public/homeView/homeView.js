'use strict';

var homeViewController = angular.module('graphApp.homeView', ['ngRoute', 'graphApp.factories']);

homeViewController.controller('HomeCtrl', 
    function($scope, $http, BugManager) {
        
        $scope.bugsLastSynced = localStorage['bugsLastSynced'] || 'no data synced' ;

        $scope.loading = 'none';

        $scope.options = [
            {title: "Arial" , text: 'Url for Arial' },
            {title: "Helvetica" , text: 'Url for Helvetica' }
        ];

        $scope.selectedOption = $scope.options[0];
        
        $scope.change= function(option){
            alert(option.title);
        }

        $scope.sync = function($event) {
            var button = $event.currentTarget;
            button.disabled = true;
            localStorage['bugs'] = undefined;
            $scope.loading = 'inline-block';
            
            $http.get('/sync')
                .success(function(data, status, headers, config) {
                    localStorage['bugs'] = JSON.stringify(data);
                    localStorage['bugsLastSynced'] = new Date();
                    $scope.bugsLastSynced = localStorage['bugsLastSynced'];
                    button.disabled = false;
                    $scope.loading = 'none';
                })
                .error(function(data, status, headers, config) {
                    alert("an error occurred")
                    button.disabled = false;
                    $scope.loading = 'none';
                })
        }
        
        
        
    }
);