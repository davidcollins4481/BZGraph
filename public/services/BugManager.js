angular.module('graphApp.factories', [])
.service('BugManager', function() {

    this.reload = function(data) {

        if (data) {
            localStorage['bugs'] = JSON.stringify(data);
            this._bugs = localStorage['bugs'] ? JSON.parse(localStorage['bugs']) : undefined;
            localStorage['bugsLastSynced'] = new Date();
            localStorage['users_with_bugs'] = JSON.stringify(this._getUsersWithBugs());

            var userBugsMap = {};
            var that = this;
            this._getUsersWithBugs().forEach(function(email) {
                userBugsMap[email] = that._getBugsAssignedByEmail(email);
            });

            localStorage['bugs_by_user'] = JSON.stringify(userBugsMap);
        } else {
            this._bugs = localStorage['bugs'] ? JSON.parse(localStorage['bugs']) : undefined;
        }
    };

    this._getBugsAssignedByEmail = function(email) {
        if (!email) {
            return;
        }

        var results = [];
        this._bugs.forEach(function(bug) {
            if (bug.assigned_to === email) {
                results.push(bug);
            }
        });
        
        return results;
    };

    this.getBugsAssignedByEmail = function(email) {
        if (!localStorage['bugs_by_user']) {
            return;
        }

        var bugsByEmail = JSON.parse(localStorage['bugs_by_user']);
        return bugsByEmail[email];
    };
        
    this._getUsersWithBugs = function() {
        var users = {};
        this._bugs.forEach(function(bug) {
            users[bug.assigned_to] = 1;
        });
        
        return Object.keys(users);
    };

    this.getUsersWithBugs = function() {
        return localStorage['users_with_bugs'] ? JSON.parse(localStorage['users_with_bugs']) : [];
    };

    this.getLastSynced = function() {
        return localStorage['bugsLastSynced'];
    };
        
    this.reload();
});