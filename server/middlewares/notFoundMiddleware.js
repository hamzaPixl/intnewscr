const errors = require('../domain/models/errors');

const notFoundMiddleware = function notFoundMiddleware(req, res, next) {
  next(new errors.NotFoundError(req.originalUrl));
};

module.exports = notFoundMiddleware;
