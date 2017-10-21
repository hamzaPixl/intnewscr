const localEnv = require('./local-env.js');

localEnv.setEnv();
const ENV = process.env.ENV;

module.exports = {
  ENV,
};

