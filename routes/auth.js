var jwt = require('jwt-simple');
var sha1 = require('sha1');
var httpCodes = require('http-status');
var userDb = require('../dataAccess/user');
var secret = require('../server/config').secret;
var expTime = require('../server/config').expTime;

var auth = {
    login: function(req, res) {

        var username = req.body.username || '';
        var password = req.body.password || '';

        if (username == '' || password == '') {
            res.status(httpCodes.BAD_REQUEST);
            res.json({
                "status": httpCodes.BAD_REQUEST,
                "message": "Invalid credentials"
            });
        }
        else {
            password = sha1(password);

            var callback = function (err, user) {
                if (user) {
                    // generate a token and dispatch it to the client
                    res.status(httpCodes.OK);
                    res.json(genToken(user));
                }
                else {
                    res.status(httpCodes.BAD_REQUEST);
                    res.json({
                        "status": httpCodes.BAD_REQUEST,
                        "message": "Invalid credentials"
                    });
                }
            };

            userDb.find(username, password, callback);
        }
    }
}

// private method
function genToken(user) {
    var expires = expiresIn(expTime);
    var token = jwt.encode({
        exp: expires,
        username: user.id
    },  secret);

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