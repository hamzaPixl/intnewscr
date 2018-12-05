const news = require('./news.json');

async function getBySource() {
  // STUB - News widget
  return Promise.resolve(news);
}

async function getSources() {
  // STUB - News widget
  return Promise.resolve(['rtl']);
}

module.exports = {
  getBySource,
  getSources,
};
