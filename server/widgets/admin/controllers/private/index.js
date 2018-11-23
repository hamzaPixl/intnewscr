const passport = require('passport');
const router = require('express').Router({ mergeParams: true });

const usersController = require('./usersController');
const authController = require('./authController');

router.use('/auth', authController);
router.use('/users', passport.authenticate('jwt', { session: false }), usersController);

module.exports = router;
