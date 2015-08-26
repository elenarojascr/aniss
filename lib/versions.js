/**
 * Created by Elena on 08/2015.
 */

var config = require('../server/config');

/* Verifies Api Versions*/
var isValidApiVersion = function(version, controller){
    if(controller) {
        return config.apiVersions.indexOf(version) >= 0 && config.apiControllers.indexOf(controller) >= 0;
    }
    else{
        return config.apiVersions.indexOf(version) >= 0;
    }
};

/* Gets the controller of specified version */
var getController = function(version, controller){
    if(isValidApiVersion(version, controller)) {
        return require('../controllers/' + version + '/' + controller);
    }
    return null;
};

module.exports = {
    getController: getController,
    isValidVersion: isValidApiVersion
};