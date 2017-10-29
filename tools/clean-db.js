require('../config').searchENV();
const database = require('../database');
const collections = require('../database/models/collections.json');
const logger = require('./logger');

database.connect()
.then((db) => {
  Object.keys(collections).map((key) => {
    logger.log(`This collection will be empty : ${key}`);
    return db.collection(key).remove({});
  });
  logger.log('The database is successfuly cleared');
  database.close();
}).catch();
