const { validate } = require('../../../../tools/jsonSchemaValidator');
const configurationsValidator = require('./configurationsValidator');

const payload = {
  name: 'name',
  description: 'description',
};

describe('INT NEWS SCREEN - schema - admin - configurations', () => {
  test('should validate this payload', () => {
    const result = validate(payload, configurationsValidator);
    expect(result).toBeNull();
  });
  test('should not validate this payload, name is required', () => {
    const result = validate({ description: 'description' }, configurationsValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
  test('should not validate this payload, description is required', () => {
    const result = validate({ name: 'name' }, configurationsValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
});
