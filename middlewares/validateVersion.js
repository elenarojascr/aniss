/**
 * Created by erojas on 08/2015.
 */
var versions = require('../lib/versions');
var common = require('../lib/common');

/* Checks if version in the url is valid*/
module.exports = function(req, res, next) {
    var isValid = versions.isValidVersion(req.params.version);
    if (isValid) {
        next();
    }
    else {
        common.invalidURLFn(res);
    }
};