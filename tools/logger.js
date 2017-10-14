const winston = require('winston');

class Logger {

  constructor() {
    winston.emitErrs = true;
    this.logger = new winston.Logger({
      transports: [
        new winston.transports.File({
          level: 'info',
          filename: './.logs/all-logs.log',
          handleExceptions: true,
          json: true,
          maxsize: 5242880,
          maxFiles: 5,
          colorize: false,
        }),
        new winston.transports.Console({
          level: 'debug',
          handleExceptions: true,
          json: false,
          colorize: true,
        }),
      ],
      exitOnError: false,
    });
    if (process.env.NODE_ENV !== 'local') {
      this.logger.add(new winston.transports.Console({
        format: winston.format.simple(),
        level: 'info',
        handleExceptions: true,
        json: false,
        colorize: true,
      }));
    }
  }
  /**
   * Log the error message
   *
   * @param {any} err message
   * @memberof Logger
   */
  logger(err) {
    this.logger.info(err);
  }

}

module.exports = new Logger();
