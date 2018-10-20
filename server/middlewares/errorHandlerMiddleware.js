const errors = require('../domain/models/errors');

function errorHandlerMiddleware(err, req, res, next) {
  let status;

  if (err instanceof errors.ValidationError) {
    status = 400;
  } else if (err instanceof errors.NotFoundError) {
    status = 404;
  } else {
    status = 500;
    err.name = 'API error';
    delete err.details;
    delete err.message;
    delete err.code;
  }

  res.status(status).json({
    status,
    name: err.name,
    message: err.message,
    details: err.details,
    code: err.code,
    rules: err.rules,
  });
}

module.exports = errorHandlerMiddleware;
