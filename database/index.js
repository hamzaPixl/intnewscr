const MongoClient = require('mongodb').MongoClient;
const logger = require('../tools/logger');
const Promise = require('bluebird');

class Database {

  constructor() {
    this.url = `${process.env.DB_URL}${process.env.DB_PORT}/${process.env.DB_NAME}`;
    this.db = null;
  }

  /**
   * Connect to the database
   * @returns the database instance in a Promise
   */
  connect() {
    if (this.db) {
      return new Promise((resolve, reject) => { return resolve(this.db); });
    }
    return new Promise((resolve, reject) => {
      logger.log(`Try to connect to database url : ${this.url}`);
      MongoClient.connect(this.url).then((db) => {
        logger.log('The connection to the databse is successfuly finished');
        this.db = db;
        return resolve(this.db);
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
  close() {
    if (this.db) {
      logger.log('the connection to the databse is closed');
      this.db.close();
    }
  }

  /**
   * Get the instance of the connection
   */
  getInstance() {
    return this.db;
  }
}


module.exports = Database;
