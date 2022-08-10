const Router = require('express');
const router = new Router();
const controller = require('../controllers/authController');
const {check} = require('express-validator');

const checkCredentials = [check('login', 'login can not be empty').notEmpty(), check('password', 'password must not be less than 8 characters').isLength({min: 8})];

router.post('/registration', checkCredentials, controller.registration);
router.post('/login', controller.login);
router.post('/isAuth', controller.isAuth);


module.exports = router;

