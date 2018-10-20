const logger = require('../../../../infrastructure/logger');
const news = require('./news.json');

async function getBySource() {
  logger.info('STUB - News widget');
  return Promise.resolve(news);
}

module.exports = {
  getBySource,
};
