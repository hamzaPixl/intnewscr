require('../config').searchENV();
const database = require('../database');
const collections = require('../database/models/collections.json');

database.connect()
.then((db) => {
  Object.keys(collections).map((key) => {
    return db.collection(key).drop();
  });
}).catch();
