const { validate } = require('../../../../tools/jsonSchemaValidator');
const newsValidator = require('./newsValidator');

const payload = {
  source: 'rtl',
};

describe('INT NEWS SCREEN - schema - weather', () => {
  test('should validate this payload', () => {
    const result = validate(payload, newsValidator);
    expect(result).toBeNull();
  });
  test('should not validate this payload, source is required', () => {
    const result = validate({}, newsValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
  test('should not validate this payload, source is a string', () => {
    payload.source = 9;
    const result = validate(payload, newsValidator);
    expect(result.length).toBe(2);
    expect(result[0].property).toBe('instance.source');
  });
  test('should not validate this payload, source is not in the enum', () => {
    payload.source = 'kkk';
    const result = validate(payload, newsValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance.source');
  });
});
