require('../config').searchENV();
const Promise = require('bluebird');
const database = require('../database');
const RepositoryController = require('../database/RepositoryController');
const logger = require('./logger');
const modules = require('../modules/modules.json');

database.connect()
.then(() => {
  logger.log('Load all modules and create the corresponding collection');
  const promises = modules.map((module) => {
    const Model = require(`${module.pathModel}`);
    const model = new Model();
    logger.log(`Create the collection for ${module.name} : ${model.getCollection()}`);
    const repo = new RepositoryController(database.get(), model);
    return new Promise((resolve) => {
      return resolve(repo.createCollection());
    });
  });
  Promise.all(promises).then(() => {
    logger.log('The database is successfuly cleared');
    database.close();
  });
})
.catch(err => logger.log(err));
