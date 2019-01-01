const errorHandlerMiddleware = require('./errorHandlerMiddleware');
const errorLoggerMiddleware = require('./errorLoggerMiddleware');
const notFoundMiddleware = require('./notFoundMiddleware');
const docMiddleware = require('./docMiddleware');
const corsMiddleware = require('./corsMiddleware');

module.exports = {
  errorHandlerMiddleware,
  errorLoggerMiddleware,
  docMiddleware,
  notFoundMiddleware,
  corsMiddleware,
};
