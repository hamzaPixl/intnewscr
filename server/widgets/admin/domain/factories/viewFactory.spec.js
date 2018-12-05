const viewFactory = require('./viewFactory');

describe('INT NEWS SCREEN - admin - factory - viewFactory', () => {
  it('should create a valid instance', () => {
    const payload = {
      name: 'name',
      widget: 'widget',
      path: 'path',
      queryParams: 'queryParams',
    };
    const views = viewFactory.createFromPayload(payload);
    expect(views).toBeDefined();
    expect(views.name).toBe(payload.name);
    expect(views.widget).toBe(payload.widget);
    expect(views.path).toBe(payload.path);
    expect(views.queryParams).toBe(payload.queryParams);
  });
  it('should create a valid instance with empty payload', () => {
    const views = viewFactory.createFromPayload({});
    expect(views).toBeDefined();
    expect(views).toMatchObject({});
  });
  it('should create nothing if no payload', () => {
    const views = viewFactory.createFromPayload(null);
    expect(views).toBeNull();
  });
});
