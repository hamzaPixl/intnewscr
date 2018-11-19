const passport = require('passport');

const authenticationMiddleware = function authenticationMiddleware(req, res, next) {
  return passport.authenticate('jwt', { session: false });
};

module.exports = authenticationMiddleware;
