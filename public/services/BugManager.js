angular.module('graphApp.factories', [])
.service('BugManager', function() {
        
    this._bugs = JSON.parse(localStorage['bugs']);
        
    this.getBugs = function() {
        return this._bugs;
    }
        
    this.getBugsAssignedToEmail = function(email) {
        if (!email) {
            return;
        }
        
        var results = [];
        this._bugs.forEach(function(bug) {
            if (bug.assigned_to === email) {
                results.push(bug);
            }
        })
        
        return results;
    }
        
    this.getUsersWithBugs = function() {
        var users = {};
        this._bugs.forEach(function(bug) {
            users[bug.assigned_to] = 1;
        });
        
        return Object.keys(users);
    };
});