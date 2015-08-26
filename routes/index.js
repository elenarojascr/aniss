/**
 * Created by Elena on 08/2015.
 * Contains the list of routes
 */
var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var versions = require('../lib/versions');
var common = require('../lib/common');

/*
 * Routes that can be accessed by any one
 */
router.post('/api/login', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/:version/product', function(req, res){
    versions.getController(req.params.version, 'product').getAll(req, res);
});

/*
 * Routes that can be accessed only by authenticated & authorized users
 */

router.get('/api/:version/admin/user', function(req, res){
    versions.getController(req.params.version, 'user').getAll(req,res);
});

router.get('/api/:version/user/admin/:id', function(req, res){
    versions.getController(req.params.version, 'user').getOne(req, res);
});

router.post('/api/:version/user/admin/', function(req, res){
    versions.getController(req.params.version, 'user').create(req, res);
});
router.put('/api/:version/user/admin/:id', function(req, res){
    versions.getController(req.params.version, 'user').update(req, res);
});
router.delete('/api/:version/user/admin/:id', function(req, res){
    var controller = versions.getController(req.params.version, 'user').delete(req, res);
});

module.exports = router;