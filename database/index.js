const MongoClient = require('mongodb').MongoClient;
const logger = require('../tools/logger');
const Promise = require('bluebird');

const state = {
  url: `${process.env.DB_URL}${process.env.DB_PORT}/${process.env.DB_NAME}`,
  db: null,
};
const options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 5000,
};

/**
 * Connect to the database
 * @returns the database instance in a Promise
 */
function connect() {
  if (state.db) {
    return new Promise(resolve => resolve(state.db));
  }
  return new Promise((resolve, reject) => {
    logger.log(`Try to connect to database url : ${state.url}`);
    MongoClient.connect(state.url, options).then((db) => {
      logger.log('The connection to the database is successfull');
      state.db = db;
      return resolve(state.db);
    }).catch((err) => {
      logger.log('Cannot connect to the database');
      logger.log(err);
      return reject(err);
    });
  });
}

/**
 * Close the database
 */
function close() {
  if (state.db) {
    logger.log('the connection to the database is closed');
    state.db.close();
    state.db = null;
  }
}

/**
 * Get the instance of the connection
 */
function get() {
  return state.db;
}

module.exports = {
  get,
  connect,
  close,
};
