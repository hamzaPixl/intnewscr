const winston = require('winston');

class Logger {

  constructor() {
    this.logLevel = 'info';
    this.customColors = {
      trace: 'white',
      debug: 'green',
      info: 'blue',
      warn: 'yellow',
      crit: 'red',
      fatal: 'red',
    };
    this.logger = new (winston.Logger)({
      colors: this.customColors,
      level: this.logLevel,
      levels: {
        fatal: 0,
        crit: 1,
        warn: 2,
        info: 3,
        debug: 4,
        trace: 5,
      },
      transports: [
        new (winston.transports.Console)({
          colorize: true,
          timestamp: true,
        }),
        new (winston.transports.File)({ filename: 'logs/err.log' }),
      ],
    });
    winston.addColors(this.customColors);
  }

  /**
   * Log the error message
   *
   * @param {any} err message
   * @memberof Logger
   */
  log(err) {
    if (err instanceof Error) {
      this.logger.fatal(err);
    } else {
      this.logger.info(err);
    }
  }

}

module.exports = new Logger();
