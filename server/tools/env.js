const config = require('config');

function isLocal() {
  return config.env === 'local';
}

function isProduction() {
  return config.env === 'production';
}

function isDev() {
  return config.env === 'dev';
}

function isTest() {
  return config.env === 'test';
}

module.exports = {
  isDev,
  isLocal,
  isProduction,
  isTest,
};
