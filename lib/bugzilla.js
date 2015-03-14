"use strict";

var xmlrpc = require('xmlrpc'),
    vsprintf = require('sprintf').vsprintf,
    cliOps = {
        host: 'bugzilla.innismaggiore.org',
        port: 80,
        path: '/xmlrpc.cgi',
        basic_auth: {
            user: 'bugzilla',
            pass: 'h3lloBugZi114'
        }
    },
    client = xmlrpc.createClient(cliOps),
    token = undefined;


var Bugzilla = function() {};

Bugzilla.prototype._auth = function(postAuth) {
    if (token) {
        return postAuth();
    }

    client.methodCall('User.login', [{ login: 'davidc@innismaggiore.com', password: '...' }],
        function (error, value) {
            if (error) {
                console.log("Error: " + error);
                return;
            }

            token = value['token'];
            postAuth()
        }
    );
}

Bugzilla.prototype.allBugs = function(onComplete, onError) {
    this._auth(function() {
        client.methodCall('Bug.search', [{'status': 'CONFIRMED'}],
            function(error, response) {
                if (error) {
                    return onError(error);
                }

                return onComplete(response.bugs);
            }
        );
    });
}

module.exports = new Bugzilla();