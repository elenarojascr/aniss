/**
 * Created by Elena on 08/2015.
 * Login
 */

var jwt = require('jwt-simple');
var sha1 = require('sha1');
var httpStatus = require('http-status');
var userDb = require('../dataAccess/user');
var config = require('../server/config');
var common = require('../lib/common');

var auth = {
    login: function(req, res) {

        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            common.invalidCredentialsFn(res);
        }
        else {
            password = sha1(password);

            var callback = function (err, user) {
                if (user) {
                    // generate a token and dispatch it to the client
                    res.status(httpStatus.OK);
                    res.json(genToken(user));
                }
                else {
                    common.invalidCredentialsFn(res);
                }
            };

            userDb.find(username, password, callback);
        }
    }
}

// private method
function genToken(user) {
    var expires = expiresIn(config.expTime);
    var token = jwt.encode({
        exp: expires,
        id: user.id
    },  config.secret);

    return {
        token: token,
        expires: expires,
        user: user
    };
}

function expiresIn(numDays) {
    var dateObj = new Date();
    return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;