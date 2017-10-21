const logger = require('../../../tools/logger');

/**
 * Get all the weather
 * @param {any} queryParams
 */
function get(queryParams) {
  logger.log(queryParams);
  return 'ok';
}

module.exports = {
  get,
};
