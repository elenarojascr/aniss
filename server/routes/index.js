/**
 * Created by Elena on 2015-08-13.
 * Contains the list of routes
 */
var express = require('express');
var router = express.Router();
var auth = require('./auth.js');
var loans = require('../../controllers/loans.js');
var users = require('../../controllers/users.js');

/*
 * Routes that can be accessed by any one
 */
router.post('/login', auth.login);

/*
 * Routes that can be accessed only by autheticated users
 */
router.get('/api/:version/loans', loans.execute('getAll'));

/*
 * Routes that can be accessed only by authenticated & authorized users
 */

router.get('/api/:version/users', users.execute('all'));
router.get('/api/:version/user/:id', users.execute('find'));
router.create('/api/:version/user/', users.execute('create'));
router.put('/api/:version/user/:id', users.execute('update'));
router.delete('/api/:version/user/:id', users.execute('delete'));

module.exports = router;