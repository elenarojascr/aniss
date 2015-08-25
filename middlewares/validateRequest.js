var jwt = require('jwt-simple');
var validateUser = require('../routes/auth').validateUser;
var httpCodes = require('http-status');
var secret = require('../server/config.js').secret;
var userDb = require('../dataAccess/user');

module.exports = function(req, res, next) {
    var token = req.headers['x-access-token'];

    if (token) {
        try {
            var decoded = jwt.decode(token, secret);

            if (decoded.exp <= Date.now()) {
                res.status(httpCodes.BAD_REQUEST);
                res.json({
                    "status": httpCodes.BAD_REQUEST,
                    "message": "Token Expired"
                });
            }
            else {
                var callback = function(err, dbUser){
                    if (dbUser) {
                        if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0)) {
                            next(); // To move to next middleware
                        } else {
                            res.status(httpCodes.UNAUTHORIZED);
                            res.json({
                                "status": httpCodes.UNAUTHORIZED,
                                "message": "Not Authorized"
                            });
                        }
                    } else {
                        // No user with this name exists, respond back with a 401
                        res.status(httpCodes.UNAUTHORIZED);
                        res.json({
                            "status": httpCodes.UNAUTHORIZED,
                            "message": "Invalid User"
                        });
                    }
                }
                userDb.findOne(decoded.id, callback);
            }

        } catch (err) {
            res.status(httpCodes.INTERNAL_SERVER_ERROR);
            res.json({
                "status": httpCodes.INTERNAL_SERVER_ERROR,
                "message": "Oops something went wrong"
            });
        }
    } else {
        res.status(httpCodes.BAD_REQUEST);
        res.json({
            "status": httpCodes.BAD_REQUEST,
            "message": "Invalid Token or Key"
        });
    }
};