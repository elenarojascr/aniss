var apiVersions = ['v1'];
var apiControllers = ['products', 'users']

var isValidApiVersion = function(version, controller){
    return apiVersions.indexOf(version)>=0 && apiControllers.indexOf(controller)>=0;
};

var getController = function(version, controller){
    if(isValidApiVersion(version)) {
        return require('../controllers/' + version + '/' + controller);
    }
    return null;
};

module.exports = {
    versions: apiVersions,
    isValidApiVersion: isValidApiVersion,
    getController: getController
};