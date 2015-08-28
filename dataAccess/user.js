
var UserModel = require('./../db/models').UserModel;

// Functions
function addFn(username, email, password, firstName, lastName, dateOfBirth, startDate, identification, roleId, callback) {
    var instance = new UserModel();
    instance.username = username;
    instance.password = password;
    instance.firstName = firstName;
    instance.lastName = lastName;
    instance.dateOfBirth = dateOfBirth;
    instance.startDate = startDate;
    instance.identification = identification;
    instance.email = email;
    instance.active = false;
    instance.role = roleId;

    instance.save(function (err) {
        callback(err, instance)
    });
}

function updatePassword(id, newPassword, callback){

    UserModel.findById(id, function(err, instance) {
        if (err){
            callback(err);
        }
        else {
            // change the users location
            instance.password = newPassword;

            // save the user
            instance.save(function (err) {
                callback(err, instance);
            });
        }
    });
}

function updateFn(id, firstName, lastName, dateOfBirth, startDate, callback) {

    UserModel.findById(id, function(err, instance) {
        if (err){
            callback(err);
        }
        else {
            instance.firstName = firstName;
            instance.lastName = lastName;
            instance.dateOfBirth = dateOfBirth;
            instance.startDate = startDate;

            // save the user
            instance.save(function (err) {
                callback(err, instance);
            });
        }
    });
}

function deleteFn(id, callback){
    UserModel.findById(id, function(err, instance) {
        if (err){
            callback(err);
        }
        else {
            instance.remove(function (err) {
                callback(err, instance);
            });
        }
    });
}

function activate(id, callback){
    UserModel.findById(id, function(err, instance) {
        if (err){
            callback(err);
        }
        else {
            // change the users location
            instance.active = true;

            // save the user
            instance.save(function (err) {
                callback(err, instance);
            });
        }
    });
}

function findAll(callback){
    UserModel.find({}, function(err, instances) {
        callback(err, instances);
    });
}

function findOne(id,callback){
    UserModel.findById(id, function(err, instance){
        callback(err, instance);
    });
}

function find(myUsername, myPassword, callback){
    UserModel.find({username: myUsername, password: myPassword},
        function(err, instance){
            callback(err, instance);
    });
}

// Exports
module.exports = {
    add: addFn,
    update: updateFn,
    delete: deleteFn,
    updatePassword: updatePassword,
    activate: activate,
    findAll: findAll,
    findOne: findOne,
    find: find
}