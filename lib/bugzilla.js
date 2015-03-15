"use strict";

var xmlrpc = require('xmlrpc'),
    nconf = require('nconf').file('./conf/bugzilla.json'),
    vsprintf = require('sprintf').vsprintf,
    cliOps = {
        host: nconf.get('bugzilla_url'),
        port: nconf.get('bugzilla_port'),
        path: '/xmlrpc.cgi',
        basic_auth: {
            user: nconf.get('http_auth_username'),
            pass: nconf.get('http_auth_password')
        }
    },
    client = xmlrpc.createClient(cliOps),
    token = undefined;


var Bugzilla = function() {};

Bugzilla.prototype._auth = function(postAuth) {
    if (token) {
        return postAuth();
    }

    var params = {
        login    : nconf.get('bugzilla_username'),
        password : nconf.get('bugzilla_password')
    };

    client.methodCall('User.login', [ params ],
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