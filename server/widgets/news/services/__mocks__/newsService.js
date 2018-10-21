const news = require('./news.json');

async function getBySource() {
  // STUB - News widget
  return Promise.resolve(news);
}

module.exports = {
  getBySource,
};
