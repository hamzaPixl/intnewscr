const config = require('../config');
const logger = require('./logger');

config.searchENV();

logger.log(`Process env : ${JSON.stringify(process.env, null, 2)}`);
