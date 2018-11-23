const { clone } = require('lodash');
const { validate } = require('../../../../tools/jsonSchemaValidator');
const userValidator = require('./userValidator');

const payload = {
  email: 'email@example.com',
  password: '******',
  firstName: '******',
  lastName: '******',
};

describe('INT NEWS SCREEN - schema - admin - user', () => {
  test('should validate this payload', () => {
    const result = validate(payload, userValidator);
    expect(result).toBeNull();
  });
  test('should not validate this payload, email is required', () => {
    const user = clone(payload);
    delete user.email;
    const result = validate(user, userValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
  test('should not validate this payload, password is required', () => {
    const user = clone(payload);
    delete user.password;
    const result = validate(user, userValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
  test('should not validate this payload, firstName is required', () => {
    const user = clone(payload);
    delete user.firstName;
    const result = validate(user, userValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
  test('should not validate this payload, lastName is required', () => {
    const user = clone(payload);
    delete user.lastName;
    const result = validate(user, userValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
});
