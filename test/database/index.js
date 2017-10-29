require('../../config').searchENV();
const assert = require('assert');
const database = require('../../database');

describe('Database', () => {
  describe('Try to connect to the database when its not defined yet', () => {
    it('should not return the database instance', () => {
      const instance = database.get();
      assert.equal(instance, null);
    });
  });

  describe('Check the url for the connection', () => {
    it('should return the url of the connection', () => {
      assert.ok(process.env.DB_URL);
      assert.ok(process.env.DB_PORT);
      assert.ok(process.env.DB_NAME);
    });
  });

  describe('Try to connect to the database', () => {
    it('should successfuly connect to the database', () => {
      database.connect().then((db) => {
        assert.ok(db);
        const instance = database.get();
        assert.ok(instance);
      }).catch((err) => {
        assert.fail(err);
      });
    });
  });

  describe('Try to close to the database', () => {
    it('should close the database instance and remove the instance', () => {
      database.close();
      const instance = database.get();
      assert.equal(instance, null);
    });
  });
});
