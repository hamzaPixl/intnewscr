const errors = require('../domain/models/errors');

const authenticationMiddleware = function authenticationMiddleware(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return next(new errors.AuthenticationError());
};

module.exports = authenticationMiddleware;
