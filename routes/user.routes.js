const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.post('/myprofile', userController.profile);

module.exports = router;
