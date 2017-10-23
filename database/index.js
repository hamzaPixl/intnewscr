const MongoClient = require('mongodb').MongoClient;
const logger = require('../tools/logger');

const url = `${process.env.DB_URL}${process.env.DB_PORT}/${process.env.DB_NAME}`;
const db = null;

function connect() {
    if (db){
      return db;
    }
    MongoClient.connect(url, (err, instance) => {
      if (err) {
        return logger.log(err);
      }
      db = instance;
      return db;
    });
  }

  function close() {
    if(db){
      db.close();
    }
  }
}

module.exports = new Database();