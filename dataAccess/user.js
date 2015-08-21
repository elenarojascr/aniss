var UserModel = require('../db/models').UserModel;

// Exports
module.exports.add = addFn;
module.exports.update = updateFn;
module.exports.delete = deleteFn;
module.exports.updatePassword = updatePassword;
module.exports.activate = activate;
module.exports.findAll = findAll;
module.exports.findOne = findOne;
module.exports.find = find;

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

function find(username, password, callback){
    UserModel.find({username: username, password: password}, function(){
        if(err){
            callback(err);
        }
        else{
            user.password = null;
            callback(null, user);
        }
    });
}