(function () {
    'use strict';

    var config = require('../config');
    var express = require('express');

    exports.start = start;

    function start() {
        var app = express();
        app.use(express['static'](config.STATIC_PATH));
        app.listen(config.SERVER_PORT, function () {
            console.log('Listening on ' + config.SERVER_PORT);
        });
    }

}());
