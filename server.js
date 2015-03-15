"use strict";

var bugzilla = require('./lib/bugzilla.js'),
    express  = require('express'),
    app      = express();

app.engine('html', require('ejs').renderFile);

app.use('/', express.static(__dirname + '/public'));

app.get('/sync', function(req, res) {
    var onComplete = function(bugs) {
        res.json(bugs);
    };

    var onError = function(err) {
        res.json(err);
    };

    bugzilla.allBugs(onComplete, onError);

});

app.get('/', function(req, res){
    res.render('index.html');
});

app.listen(3000);