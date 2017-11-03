require('../../config').searchENV();
const assert = require('assert');
const database = require('../../database');

describe('Database', () => {
  describe('Check the url for the connection', () => {
    it('should return the url of the connection', () => {
      assert.ok(process.env.DB_URL);
      assert.ok(process.env.DB_PORT);
      assert.ok(process.env.DB_NAME);
    });
  });

  database.connect()
  .then((db) => {
    describe('Try to connect to the database and close it after', () => {
      it('should successfuly connect to the database', () => {
        const instance = database.get();
        assert.ok(db);
        assert.ok(instance);
      });
      it('should close the database instance and remove the instance', () => {
        database.close();
        const instanceDb = database.get();
        assert.equal(instanceDb, null);
      });
    });
  })
  .catch((err) => {
    assert.fail(err);
  });
});
