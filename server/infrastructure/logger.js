const moment = require('moment');
const winston = require('winston');

let logger = null;

const tsFormat = () => moment.utc().format('YYYY-MM-DD - HH:mm:ss.SSS');

/**
 * Initialize the loggers
 *
 * @param {String} logFileName - The log file name for file logger
 */
const init = function init(loggerName, level = 'info') {
  const transports = [
    new (winston.transports.Console)({
      level,
      handleExceptions: true,
      humanReadableUnhandledException: true,
      prettyPrint: false,
      colorize: false,
      timestamp: tsFormat,
    }),
  ];

  if (loggerName) {
    transports.push(new (winston.transports.File)({
      level: 'warn',
      handleExceptions: true,
      humanReadableUnhandledException: true,
      filename: `${loggerName}.log`,
      timestamp: tsFormat,
    }));
  }

  logger = winston.createLogger({
    transports,
  });

  logger.stream = {
    write: function write(message) {
      logger.debug(message);
    },
  };

  return logger;
};

const warn = function warn(message, err) {
  logger.warn(message, err);
};

const error = function error(message, err) {
  logger.error(message, err);
};

const fatal = function fatal(message, err) {
  logger.fatal(message, err);
};

const info = function info(message) {
  logger.info(message);
};

const debug = function debug(message) {
  logger.debug(message);
};

module.exports = {
  init,
  warn,
  error,
  info,
  fatal,
  debug,
};
