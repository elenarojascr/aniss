
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
        if (err) {
            callback(err);
        }
        else {
            callback(null, instance);
        }
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
    UserModel.findById(id, function(err, instance) {
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

function findAll(callback){
    UserModel.find({}, function(err, users) {
       if(err){
           callback(err);
       }
        else{
           callback(null, users);
       }
    });
}

function findOne(id,callback){
    UserModel.findById(id, function(err, user){
        if(err){
            callback(err);
        }
        else{
            user.password = null;
            callback(null, user);
        }
    });
}

function find(myUsername, myPassword, callback){
    UserModel.find({username: myUsername, password: myPassword},
        function(err, user){
            if(!user || !user.length){
                callback(err);
            }
            else {
                user[0].password = null;
                callback(null, user[0]);
            }
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