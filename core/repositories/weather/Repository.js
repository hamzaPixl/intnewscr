const db = require('../../../database').getInstance();
const RepositoryController = require('../../../database/RepositoryController');
const model = require('../../../database/models/weather');

const controller = new RepositoryController(db, model);

/**
 * Get all the weather
 */
function get() {
  return controller.findAll();
}

module.exports = {
  get,
};
