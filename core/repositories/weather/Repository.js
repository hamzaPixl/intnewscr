const db = require('../../../database').getInstance();
const RepositoryController = require('../../../database/RepositoryController');

const COLLECTION = 'weathers';

const controller = new RepositoryController(db, COLLECTION);

/**
 * Get all the weather
 */
function get() {
  return controller.findAll();
}

module.exports = {
  get,
};
