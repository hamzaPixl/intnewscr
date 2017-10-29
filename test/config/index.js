const assert = require('assert');

describe('Configuration variables', () => {
  describe('Try to connect to the database', () => {
    it('should not have the process env custom', () => {
      assert.equal(process.env.ENV, undefined);
      assert.equal(process.env.JWT_SECRET, undefined);
      assert.equal(process.env.PORT, undefined);
      assert.equal(process.env.APP_URL, undefined);
      assert.equal(process.env.DB_PORT, undefined);
      assert.equal(process.env.DB_NAME, undefined);
      assert.equal(process.env.DB_URL, undefined);
    });

    it('should return the process env', () => {
      require('../../config').searchENV();
      assert.ok(process.env.ENV);
      assert.ok(process.env.JWT_SECRET);
      assert.ok(process.env.USER);
      assert.ok(process.env.PASSWORD);
      assert.ok(process.env.PORT);
      assert.ok(process.env.APP_URL);
      assert.ok(process.env.DB_PORT);
      assert.ok(process.env.DB_NAME);
      assert.ok(process.env.DB_URL);
    });
  });
});
