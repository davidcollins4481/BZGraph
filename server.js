"use strict";

var bugzilla = require('./lib/bugzilla.js');

var onComplete = function(bugs) {
    console.log(bugs);
};

var onError = function(err) {
    console.error(err);
}

bugzilla.allBugs(onComplete, onError);