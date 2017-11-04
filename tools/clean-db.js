require('../config').searchENV();
const database = require('../database');
const logger = require('./logger');
const Promise = require('bluebird');

database.connect()
.then((db) => {
  db.listCollections().toArray().then((list) => {
    const promises = list.map((collection) => {
      logger.log(`This collection will be empty : ${collection.name}`);
      return new Promise((resolve) => {
        return resolve(db.collection(collection.name).deleteMany({}));
      });
    });
    Promise.all(promises).then(() => {
      logger.log('The database is successfuly cleared');
      database.close();
    });
  });
}).catch();
