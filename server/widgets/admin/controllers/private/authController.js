const passport = require('passport');
const router = require('express').Router({ mergeParams: true });
const { authServices } = require('../../services');
const { loginValidator } = require('../validators');
const middlewares = require('../../../../middlewares/http');

router.post('/',
  middlewares.validateContentMiddleware(loginValidator),
  passport.authenticate('login'),
  (req, res, next) => authServices.login(req.user)
  .then(token => res.json({ token }))
  .catch(next)
);

module.exports = router;
