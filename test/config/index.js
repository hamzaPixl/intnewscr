require('../../config').searchENV();
const assert = require('assert');

describe('Configuration variables', () => {
  describe('Try to connect to the database', () => {
    it('should return the process env', () => {
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
