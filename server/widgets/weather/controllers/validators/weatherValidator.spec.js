const { validate } = require('../../../../tools/jsonSchemaValidator');
const weatherValidator = require('./weatherValidator');

const payload = {
  city: 'brussels',
};

describe('INT NEWS SCREEN - schema - weather', () => {
  test('should validate this payload', () => {
    const result = validate(payload, weatherValidator);
    expect(result).toBeNull();
  });
  test('should not validate this payload, city is required', () => {
    const result = validate({}, weatherValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
  test('should not validate this payload, city is a string', () => {
    payload.city = 9;
    const result = validate(payload, weatherValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance.city');
  });
});
