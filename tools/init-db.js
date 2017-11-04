require('../config').searchENV();
const database = require('../database');
const RepositoryController = require('../database/RepositoryController');
const logger = require('./logger');
const modules = require('../modules/modules.json');

database.connect()
.then(() => {
  logger.log('Load all modules and create the corresponding collection');
  modules.forEach((module) => {
    const Model = require(`${module.pathModel}`);
    const model = new Model();
    logger.log(`Create the collection for ${module.name} : ${model.getCollection()}`);
    const repo = new RepositoryController(database.get(), model);
    repo.createCollection();
  });
  database.close();
})
.catch(err => logger.log(err));
