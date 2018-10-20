const neuralyzer = require('../tools/neuralyzer');
const logger = require('../infrastructure/logger');

function errorLoggerMiddleware(err, req, res, next) {
  const warningErrors = ['NotFoundError'];

  if (warningErrors.includes(err.name)) {
    logger.warn(err.message, buildErrorDetails(req, err));
  } else {
    logger.error(err.message, buildErrorDetails(req, err));
  }

  next(err);
}

function buildErrorDetails(req, err) {
  const reqDetails = {
    url: req.originalUrl,
    cookies: req.cookies,
    headers: neuralyzer(req.headers),
    params: req.params,
    body: JSON.stringify(neuralyzer(req.body), null, 2),
    query: neuralyzer(req.query),
  };

  if (req.user) {
    reqDetails.user = {
      id: req.user.id,
      email: req.user.email,
      name: req.user.fullname,
    };
  }

  return {
    error: {
      data: err,
      stack: err.stack,
    },
    req: reqDetails,
  };
}

module.exports = errorLoggerMiddleware;
