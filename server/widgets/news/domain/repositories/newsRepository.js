const News = require('../models/News');

/**
 * Save a new news in the database
 * @param {News} news
 * @returns {News} the news saved
 */
function save(news) {
  return news.save()
    .then(() => news);
}

/**
 * Retrieve all news by source
 * @returns {Array[News]}
 */
function findAllBySource(source) {
  return News.find({ source });
}

module.exports = {
  save,
  findAllBySource,
};
