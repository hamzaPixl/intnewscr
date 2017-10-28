const config = require('../config');
const logger = require('./logger');

config.searchENV();

logger.info(`Process env : ${process.env}`);
