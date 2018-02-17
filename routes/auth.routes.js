const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const secure = require('../configs/passport.configs');
const passport = require('passport');

/* GET home page. */
router.get('/login', secure.nonAuthenticated, authController.login);
router.get('/signup',secure.nonAuthenticated, authController.signup);

router.post('/signup', secure.nonAuthenticated, authController.doSignup);
router.post('/login', secure.nonAuthenticated,authController.doLogin);
router.get('/logout',secure.isAuthenticated, authController.logout);
router.post('/google', passport.authenticate('google-auth', { scope: ['openid', 'profile', 'email']}));
router.get('/google/cb', authController.loginWithProviderCallback)



module.exports = router;
