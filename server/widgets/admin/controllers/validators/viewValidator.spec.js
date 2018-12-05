const { clone } = require('lodash');
const { validate } = require('../../../../tools/jsonSchemaValidator');
const viewValidator = require('./viewValidator');

const payload = {
  name: 'name',
  widget: 'widget',
  path: 'path',
  queryParams: 'queryParams',
};

describe('INT NEWS SCREEN - schema - admin - view', () => {
  test('should validate this payload', () => {
    const result = validate(payload, viewValidator);
    expect(result).toBeNull();
  });
  test('should not validate this payload, name is required', () => {
    const view = clone(payload);
    delete view.name;
    const result = validate(view, viewValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
  test('should not validate this payload, widget is required', () => {
    const view = clone(payload);
    delete view.widget;
    const result = validate(view, viewValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
  test('should not validate this payload, path is required', () => {
    const view = clone(payload);
    delete view.path;
    const result = validate(view, viewValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
  test('should not validate this payload, queryParams is required', () => {
    const view = clone(payload);
    delete view.queryParams;
    const result = validate(view, viewValidator);
    expect(result.length).toBe(1);
    expect(result[0].property).toBe('instance');
  });
});
