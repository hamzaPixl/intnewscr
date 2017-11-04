const RepositoryController = require('../../../database/RepositoryController');
const Model = require('../../../database/models/weather');
const logger = require('../../../tools/logger.js');
const { filterValid, validateResult } = require('../../../tools/check.js');
const model = new Model();

/**
 * Get all the weather
 */
function get(db) {
  return new Promise(resolve => {
    const controller = new RepositoryController(db, model);
      controller.findAll()
      .toArray()
      .then((results) => {
        results = filterValid(results, model);
        if (validateResult(results)){
          const resultToReturn = results.map((result) => {
            model.fromdbPayload(result);
            return model.itemToJson();
          });
          resolve(resultToReturn);
        } else {
          resolve({});
        }
      })
      .catch((err) => {
        logger.log(err);
      });
  });
}

module.exports = {
  get,
};
