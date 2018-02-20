const express = require('express');
const router = express.Router();
const planController = require('../controllers/plan.controller');
const secure = require('../configs/passport.configs');

/* GET plans listing. */
router.get('/:idUser/plans', secure.isAuthenticated, planController.index);
router.get('/:idUser/plans/showall', secure.isAuthenticated, planController.showall);
router.get('/:idUser/plans/new', secure.isAuthenticated, planController.create);
router.post('/:idUser/plans/new', secure.isAuthenticated, planController.doCreate);

router.get('/:idUser/plans/search', secure.isAuthenticated, planController.search);
router.post('/:idUser/plans/doSearch', secure.isAuthenticated, planController.doSearch);

router.get('/:idUser/plans/:id/update', secure.isAuthenticated, planController.update);
router.post('/:idUser/plans/:id/update', secure.isAuthenticated, planController.doUpdate);

router.post('/:idUser/plans/:id/delete', secure.isAuthenticated, planController.doDelete);



module.exports = router;