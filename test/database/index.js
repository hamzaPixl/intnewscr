require('../../config').searchENV();
const assert = require('assert');
const Database = require('../database');

describe('Database', () => {
  const database = new Database();

  describe('Try to connect to the database', () => {
    it('should return the database instance when we connect', () => {
      database.connect().then((db) => {
        assert.ok(db);
      }).catch((err) => {
        assert.fail(err);
      });
    });

    it('should return the database instance', () => {
      const instance = database.getInstance();
      assert.ok(instance);
    });
  });

  describe('Check the url for the connection', () => {
    it('should return the url of the connection', () => {
      assert.ok(process.env.DB_URL);
      assert.ok(process.env.DB_PORT);
      assert.ok(process.env.DB_NAME);
      const url = `${process.env.DB_URL}${process.env.DB_PORT}/${process.env.DB_NAME}`;
      assert.equal(url, database.url);
    });
  });

  describe('Try to close to the database', () => {
    it('should close the database instance and remove the instance', () => {
      database.close();
      assert.equal(database.db, null);
    });
  });
});
