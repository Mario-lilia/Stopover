const express = require('express');
const router = express.Router();
const planController = require('../controllers/plan.controller');
const secure = require('../configs/passport.configs');

/* GET plans listing. */
router.get('/', secure.isAuthenticated, planController.index);
router.get('/new', secure.isAuthenticated, planController.create);
router.post('/new', secure.isAuthenticated, planController.doCreate);
router.get('/:id', secure.isAuthenticated, planController.update);
router.post('/:id', secure.isAuthenticated, planController.doUpdate);

router.get('/search', secure.isAuthenticated, planController.search);
// router.post('/:id/doSearch', secure.isAuthenticated, planController.doSearch);

module.exports = router;