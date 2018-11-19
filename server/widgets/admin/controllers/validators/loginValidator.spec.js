const { validate } = require('../../../../tools/jsonSchemaValidator');
const loginValidator = require('./loginValidator');

const payload = {
  email: 'email@example.com',
  password: '******',
};

describe('INT NEWS SCREEN - schema - admin', () => {
  test('should validate this payload', () => {
    const result = validate(payload, loginValidator);
    expect(result).toBeNull();
  });
  test('should not validate this payload, email is required', () => {
    const result = validate({ password: '******' }, loginValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
  test('should not validate this payload, password is required', () => {
    const result = validate({ email: 'email@example.com' }, loginValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
});
