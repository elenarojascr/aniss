var RoleModel = require('./../db/models').RoleModel;

// Exports
module.exports.add = addFn;
module.exports.update = updateFn;
module.exports.delete = deleteFn;

// Functions
function addFn(name, description, callback) {
    var instance = new RoleModel();
    instance.name = name;
    instance.description = description;

    instance.save(function (err) {
        if (err) {
            callback(err);
        }
        else {
            callback(null, instance);
        }
    });
}

function updateFn(id, name, description, callback) {

    RoleModel.findById(id, function(err, instance) {
        if (err){
            callback(err);
        }
        else {
            instance.name = name;
            instance.description = description;

            // save the user
            instance.save(function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null);
                }
            });
        }
    });
}

function deleteFn(id, callback){
    RoleModel.findById(id, function(err, instance) {
        if (err){
            callback(err);
        }
        else {
            instance.remove(function (err) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null);
                }
            });
        }
    });
}
