var dataAccess = require('../../dataAccess/user')
var httpCodes = require('http-status');
var generatePassword = require('password-generator');
var common = require('../../lib/common');

function getAll(req, res) {

    var checkResult = function(err, data){
        if(err){
            res.status(httpCodes.INTERNAL_SERVER_ERROR);
            res.json({
                status: httpCodes.INTERNAL_SERVER_ERROR,
                message: 'An error happened while getting users.'
            });
        }
        else{
            res.status(httpCodes.OK)
            res.json({
                status: httpCodes.OK,
                message: 'Success',
                data: data
            })
        }
    };

    dataAccess.findAll(checkResult);
}

function getOne(req, res) {
    var id = req.params.id;
    dataAccess.findOne(id, function(err, data){
        if(err){
            res.status(httpCodes.INTERNAL_SERVER_ERROR);
            res.json({
                status: httpCodes.INTERNAL_SERVER_ERROR,
                message: 'An error happened while getting the user.'
            });
        }
        else{
            res.status(httpCodes.OK)
            res.json({
                status: httpCodes.OK,
                message: 'Success',
                data: data
            })
        }
    });
}

function create(req, res) {
    var newUser = req.body;

    if(newUser.username && newUser.email && newUser.firstName && newUser.lastName && newUser.dateOfBirth &&
        newUser.startDate && newUser.identification){

        var password = generatePassword(12, false);

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

        dataAccess.add(newUser.username, newUser.email, sha1(password), newUser.firstName, newUser.lastName,
            newUser.dateOfBirth, newUser.startDate, newUser.identification, newUser.isAdmin? 'admin':'common', checkResult);
    }
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