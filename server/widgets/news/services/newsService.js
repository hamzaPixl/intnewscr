const config = require('config');
const { get } = require('lodash');
const erros = require('../../../domain/models/errors');
const { newsRepository } = require('../domain/repositories');
const { newsFactory } = require('../domain/factories');
const { fetchNews } = require('../infrastructure');

const sources = get(config, 'services.news.extras.sources', []);

async function getBySource({ source }) {
  if (!sources.includes(source)) {
    throw new erros.NotFoundError(`The source ${source} was not found`);
  }

  const news = await newsRepository.findAllBySource(source);
  if (news && news.length) {
    return news;
  }

  let newsApi = await fetchNews(source);
  newsApi = newsApi.map(newsFactory.createFromPayload);

  return Promise.all(newsApi.map(w => w.save()))
    .then(() => newsRepository.findAllBySource(source));
}

module.exports = {
  getBySource,
};
