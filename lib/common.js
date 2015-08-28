/**
 * Created by erojas on 8/26/15.
 */
var httpStatus = require('http-status');

var notFound = function(res){
    res.status(httpStatus.NOT_FOUND);
    res.json({
        "status": httpStatus.NOT_FOUND,
        "message": "Invalid URL"
    });
};

var invalidCredentials = function(res){
    res.status(httpStatus.BAD_REQUEST);
    res.json({
        "status": httpStatus.BAD_REQUEST,
        "message": "Invalid credentials"
    });
};

var notImplemented = function(res){
    res.status(httpStatus.NOT_IMPLEMENTED);
    res.json({
       "status": httpStatus.NOT_IMPLEMENTED,
        "message": "Method has not being implemented yet"
    });
}

module.exports = {
    invalidURLFn: notFound,
    invalidCredentialsFn: invalidCredentials,
    notImplementedFn: notImplemented
};