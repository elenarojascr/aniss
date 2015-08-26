/**
 * Created by Elena on 08/2015
 */
var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./server/config') //configuration file
var common = require('./lib/common')
var httpStatus = require('http-status');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin",config.allowedSites); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', config.allowedMethods);
    res.header('Access-Control-Allow-Headers', config.allowedHeaders);
    if (req.method == 'OPTIONS') {
        res.status(httpStatus.OK).end();
    } else {
        next();
    }
});

// Auth Middleware - This will check if the token is valid
app.all('/api/:version/*', [require('./middlewares/ValidateUser')]);

//api versioning
app.all('/api/:version/*', [require('./middlewares/validateVersion')]);

app.use('/', require('./routes'));

// If no route is matched by now, it must be a 404
app.use(function(req, res, next) {
    common.invalidURLFn(res);
});

app.listen(config.serverPort);
console.log('Express server listening on port ' + config.serverPort);
