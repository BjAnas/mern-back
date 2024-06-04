
const express = require('express');
const { test, register, login, getOneUser, getUsers } = require('../controllers/user');
const isAuth = require('../middlewares/isAuth');
const { registerValidation, validator } = require('../middlewares/validator');

const router = express.Router();

router.get('/test', test);
router.post('/Register', registerValidation(), validator, register);  // Note: Capitalized 'R' in 'Register'
router.post('/login', login);
router.get('/current', isAuth, (req, res) => {
    res.send(req.user);
});
router.get('/getUsers', getUsers);
router.get('/getOneUser/:id', getOneUser);

module.exports = router;
