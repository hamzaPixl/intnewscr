const localEnv = require('./local-env.js');

/**
 * search the ENV configuration
 */
function searchENV() {
  localEnv.setEnv();
}

module.exports = {
  searchENV,
};

