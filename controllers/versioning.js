
var _ = require('lodash');

var versions = ['v1'];

module.exports.isValidVersion = function(version){
    return versions.indexOf(version)>=0? true : false;
}