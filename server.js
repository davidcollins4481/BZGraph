"use strict";

var bugzilla = require('./lib/bugzilla.js'),
    express  = require('express'),
    app      = express();

app.get('/sync', function(req, res) {
    var onComplete = function(bugs) {
        res.json(bugs);
    };

    var onError = function(err) {
        res.json(err);
    };

    bugzilla.allBugs(onComplete, onError);

});

app.get('/', function(req, res) {
    
});

app.listen(3000);