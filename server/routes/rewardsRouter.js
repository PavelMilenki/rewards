const Router = require('express');
const router = new Router();
const controller = require('../controllers/rewardsController');
const {authenticate} = require('../middlewares/authentication');


router.get('/getAllRewards', authenticate, controller.getAllRewards);
router.post('/addRewards', authenticate, controller.addRewards);


module.exports = router;

