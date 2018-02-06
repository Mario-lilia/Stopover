const express = require('express');
const router = express.Router();
const indexController = require('../controllers/index.controller');

router.get('/signup', indexController.signup);
router.get('/login', indexController.login);

module.exports = router;
