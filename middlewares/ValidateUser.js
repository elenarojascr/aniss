/**
 * Created by Elena on 08/2015.
 */

var jwt = require('jwt-simple');
var httpCodes = require('http-status');
var secret = require('../server/config.json').secret;
var userDb = require('../dataAccess/user');

/* Checks Authentication (token) and Authorization (user role)*/
module.exports = function(req, res, next) {
    var token = req.headers['x-access-token'];

    if (token) {
        try {
            var decoded = jwt.decode(token, secret);

            //session expired
            if (decoded.exp <= Date.now()) {
                res.status(httpCodes.BAD_REQUEST);
                res.json({
                    "status": httpCodes.BAD_REQUEST,
                    "message": "Token Expired"
                });
            }
            else {
                var callback = function(err, dbUser){
                    //user found
                    if (dbUser) {
                        //user is active
                        if(dbUser.active) {
                            //user is requesting admin url and is admin
                            if ((req.url.indexOf('admin') >= 0 && dbUser.role == 'admin') || (req.url.indexOf('admin') < 0)) {
                                next(); // To move to next middleware
                            } else {
                                res.status(httpCodes.UNAUTHORIZED);
                                res.json({
                                    "status": httpCodes.UNAUTHORIZED,
                                    "message": "Not Authorized"
                                });
                            }
                        }
                        else{
                            res.status(httpCodes.UNAUTHORIZED);
                            res.json({
                                "status": httpCodes.UNAUTHORIZED,
                                "message": "Account is inactive"
                            });
                        }
                    } else {
                        //User not found
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