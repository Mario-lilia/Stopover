const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controllers');
const secure = require('../configs/passport.configs');


router.get('/:id',secure.isAuthenticated, usersController.profile);
router.get('/:id/update',secure.isAuthenticated, usersController.update);
module.exports = router;


