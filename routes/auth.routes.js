const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
/* GET home page. */
router.get('/login', authController.login);
router.get('/signup', authController.signup);

module.exports = router;
