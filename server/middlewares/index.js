const errorHandlerMiddleware = require('./errorHandlerMiddleware');
const errorLoggerMiddleware = require('./errorLoggerMiddleware');
const notFoundMiddleware = require('./notFoundMiddleware');

module.exports = {
  errorHandlerMiddleware,
  errorLoggerMiddleware,
  notFoundMiddleware,
};
