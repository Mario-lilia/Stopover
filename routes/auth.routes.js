const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const secure = require('../configs/passport.configs');

/* GET home page. */
router.get('/login', secure.nonAuthenticated, authController.login);
router.get('/signup',secure.nonAuthenticated, authController.signup);

router.post('/signup', secure.nonAuthenticated, authController.doSignup);
router.post('/login', secure.nonAuthenticated,authController.doLogin);
router.get('/logout',secure.isAuthenticated, authController.logout);


module.exports = router;
