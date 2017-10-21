const localEnv = require('./local-env.js');
const logger = require('../tools/logger');

/**
 * search the ENV configuration
 */
function searchENV() {
  logger.log('Searching and set the ENV PROCESS ...');
  localEnv.setEnv();
}

module.exports = {
  searchENV,
};

