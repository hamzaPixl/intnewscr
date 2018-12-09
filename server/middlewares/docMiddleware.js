const swaggerUi = require('swagger-ui-express');
const { merge } = require('lodash');

// Widget - Admin - Documentation
const adminDoc = require('../widgets/admin/apiDoc.json');

// Widget - Weather - Documentation
const weatherDoc = require('../widgets/weather/apiDoc.json');

// Widget - News - Documentation
const newsDoc = require('../widgets/news/apiDoc.json');

const options = {
  explorer: true,
};

const documentations = [adminDoc, weatherDoc, newsDoc];

const mainDoc = {
  swagger: '2.0',
  host: 'intnewscr.io',
  basePath: '/',
  securityDefinitions: {
    Bearer: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
    },
  },
  info: {
    description: 'Interactive news screen documentation',
    version: '1.0.0',
    title: 'Intnewscr docs',
    contact: {
      email: 'hamza@intnewscr.com',
    },
    license: {
      name: 'MIT',
      url: 'https://github.com/hamzaPixl/intnewscr/blob/devlop/LICENSE',
    },
  },
  schemes: [
    'http',
  ],
  tags: [
    {
      name: 'news',
      description: 'News widget',
    },
    {
      name: 'admin',
      description: 'Admin widget',
    },
    {
      name: 'weather',
      description: 'Weather widget',
    },
  ],
};

function mergeDocuments(docs) {
  const definitions = {};
  const paths = {};
  docs.forEach((d) => {
    merge(definitions, d.definitions);
    merge(paths, d.paths);
  });
  mainDoc.definitions = definitions;
  mainDoc.paths = paths;
  return mainDoc;
}

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(mergeDocuments(documentations), options, null, false, false, false, 'Interactive news screen documentation'),
};
