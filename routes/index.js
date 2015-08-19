/**
 * Created by Elena on 2015-08-13.
 * Contains the list of routes
 */
var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var versions = require('../server/versions');
var httpCodes = require('../cons').httpCodes;

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/:version/product', function(){
    var controller = versions.getController(req.params.version, 'product');
    if(controller){
        controller.getAll(req, res);
    }
    else{
        res.writeHead(httpCodes.NOT_FOUND);
    }
});

/*
 * Routes that can be accessed only by authenticated & authorized users
 */

router.get('/api/:version/user', function(req, res){
    var controller = versions.getController(req.params.version, 'user');
    if(controller){
        controller.getAll(req, res);
    }
    else{
        res.writeHead(httpCodes.NOT_FOUND);
    }
});

router.get('/api/:version/user/:id', function(req, res){
    var controller = versions.getController(req.params.version, 'user');
    if(controller){
        controller.getOne(req, res);
    }
    else{
        res.writeHead(httpCodes.NOT_FOUND);
    }
});

router.post('/api/:version/user/', function(req, res){
    var controller = versions.getController(req.params.version, 'user');
    if(controller){
        controller.create(req, res);
    }
    else{
        res.writeHead(httpCodes.NOT_FOUND);
    }
});
router.put('/api/:version/user/:id', function(req, res){
    var controller = versions.getController(req.params.version, 'user');
    if(controller){
        controller.update(req, res);
    }
    else{
        res.writeHead(httpCodes.NOT_FOUND);
    }
});
router.delete('/api/:version/user/:id', function(req, res){
    var controller = versions.getController(req.params.version, 'user');
    if(controller){
        controller.delete(req, res);
    }
    else{
        res.writeHead(httpCodes.NOT_FOUND);
    }
});

module.exports = router;