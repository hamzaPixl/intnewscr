const config = require('config');
const { get } = require('lodash');

const newsSchema = {
  id: 'news',
  type: 'object',
  properties: {
    source: { type: 'string', enum: get(config, 'services.news.extra.sources', []) },
  },
  required: ['source'],
};

module.exports = newsSchema;
