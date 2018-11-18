const errorHandlerMiddleware = require('./errorHandlerMiddleware');
const errorLoggerMiddleware = require('./errorLoggerMiddleware');
const notFoundMiddleware = require('./notFoundMiddleware');
const authenticationMiddleware = require('./authenticationMiddleware');

module.exports = {
  errorHandlerMiddleware,
  errorLoggerMiddleware,
  notFoundMiddleware,
  authenticationMiddleware,
};
