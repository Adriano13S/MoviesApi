const express = require('express');
const router = express.Router();
const session = require('express-session');
const passport = require('passport');
const authMiddleware = require('../admin.controllers/admin.auth');
const authRedirect = require('../admin.controllers/admin.redirect');
const authCheck = require('../admin.controllers/admin.authCheck');
const login = require('../admin.controllers/admin.login');
const logout = require('../admin.controllers/admin.logout');
const home = require('../admin.controllers/admin.home');
const homeDb = require('../admin.controllers/admin.home.db');

// Middlewares
router.use(express.urlencoded({extended: false}));
router.use(session({ secret: process.env.SESSION_SECRET }));
router.use(passport.initialize());
router.use(passport.session()); // persistent login sessions

//Paths

router.get('/', login);

router.post('/login', authMiddleware, authRedirect);
router.get('/logout', logout);

router.get('/users/:user', authCheck, home);
router.get('/users/:user/db', authCheck, homeDb);



router.get('/users/:user/collections/:collection', authCheck, ) //TODO: creat path view, form to modify fields

module.exports = router;