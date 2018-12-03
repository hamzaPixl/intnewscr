const viewMapper = require('./viewMapper');

describe('INT NEWS SCREEN - ADMIN - mappers - viewMapper', () => {
  it('should map an array of view', () => {
    const payload = [{
      _id: 'id',
      name: 'name',
      widget: 'widget',
      path: 'path',
      queryParams: 'queryParams',
    }];
    const view = viewMapper.map(payload);
    expect(view).toBeDefined();
    expect(view.length).toBe(1);
    expect(view[0].queryParams).toBe(payload[0].queryParams);
    expect(view[0].path).toBe(payload[0].path);
    expect(view[0].id).toBe(payload[0]._id);
    expect(view[0].name).toBe(payload[0].name);
    expect(view[0].widget).toBe(payload[0].widget);
  });
  it('should map an empty array', () => {
    const view = viewMapper.map([]);
    expect(view).toBeDefined();
    expect(view.length).toBe(0);
  });
  it('should map nothing', () => {
    const view = viewMapper.map();
    expect(view).toBeDefined();
    expect(view.length).toBe(0);
  });
});
