'use strict';

var homeViewController = angular.module('graphApp.homeView', ['ngRoute', 'graphApp.factories']);

homeViewController.controller('HomeCtrl', 
    function($scope, $http, BugManager) {
        $scope.bugsLastSynced = localStorage['bugsLastSynced'] || 'no data synced';
        $scope.loading = 'none';
        
        $scope.change = function(option){
            var bugInfo = BugManager.getBugsAssignedByEmail(option.text);
            console.log(bugInfo);
        }

        $scope.sync = function($event) {
            var button = $event.currentTarget;
            button.disabled = true;

            $scope.loading = 'inline-block';
            
            $http.get('/sync')
                .success(function(data, status, headers, config) {
                    BugManager.reload(data);
                    $scope.bugsLastSynced = BugManager.getLastSynced();
                    
                    button.disabled = false;
                    $scope.loading = 'none';
                })
                .error(function(data, status, headers, config) {
                    alert("an error occurred")
                    button.disabled = false;
                    $scope.loading = 'none';
                })
        }

        $scope.options = (function() {
            if (!localStorage['bugs']) {
                return [];
            }
            
            var emails = BugManager.getUsersWithBugs() || [];

            var options = emails.map(function(email) {
               return {
                   title: email,
                   text: email
               };
            });

            $scope.selectedOption = options[0] ? options[0] : undefined;
            return options;
        })();
    }
);