const configurationsMapper = require('./configurationsMapper');

describe('INT NEWS SCREEN - ADMIN - mappers - configurationsMapper', () => {
  it('should map an array of configurations', () => {
    const payload = [{
      _id: 'id',
      name: 'name',
      description: 'description',
      author: 'author',
    }];
    const configurations = configurationsMapper.map(payload);
    expect(configurations).toBeDefined();
    expect(configurations.length).toBe(1);
    expect(configurations[0].author).toBe(payload[0].author);
    expect(configurations[0].id).toBe(payload[0]._id);
    expect(configurations[0].name).toBe(payload[0].name);
    expect(configurations[0].description).toBe(payload[0].description);
  });
  it('should map an empty array', () => {
    const configurations = configurationsMapper.map([]);
    expect(configurations).toBeDefined();
    expect(configurations.length).toBe(0);
  });
  it('should map nothing', () => {
    const configurations = configurationsMapper.map();
    expect(configurations).toBeDefined();
    expect(configurations.length).toBe(0);
  });
});
