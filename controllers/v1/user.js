var dataAccess = require('../../dataAccess/user')
var httpCodes = require('http-status');
var generatePassword = require('password-generator');

function getAll(req, res) {
    res.json('NOT IMPLEMENTED');
}

function getOne(req, res) {
    var id = req.params.id;
    res.json('NOT IMPLEMENTED');
}

function create(req, res) {
    var newUser = req.body;

    if(newUser.username && newUser.email && newUser.password)

    newUser.password = generatePassword(12, false);

    var checkResult = function(err, data){
        if(err){
            res.json({
                status: httpCodes.INTERNAL_SERVER_ERROR,
                message: 'An error happened while inserting the user, try again later.'
            });
        }
        else{
            res.json({
                status: httpCodes.CREATED,
                message: 'User was created',
                data: data
            })
        }
    };

    dataAccess.add(newUser.username, newUser.email, newUser.password, newUser.firstName, newUser.lastName,
        newUser.dateOfBirth, newUser.startDate, newUser.identification, newUser.roleId, checkResult);
}

function update(req, res) {
    var updateuser = req.body;
    var id = req.params.id;
    res.json('NOT IMPLEMENTED');
}

function deleteUser(req, res){
    var id = req.params.id;
    res.json('NOT IMPLEMENTED');
}

//signature of methods
module.exports = {
    getAll: getAll,
    getOne: getOne,
    create: create,
    update: update,
    delete: deleteUser
};