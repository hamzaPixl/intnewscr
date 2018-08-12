const NotFoundError = require('../domain/models/errors/NotFoundError'); // 404

function errorHandlerMiddleware(err, req, res, next) {
  let status;

  if (err instanceof NotFoundError) {
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
