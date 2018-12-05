const configurationFactory = require('./configurationFactory');

describe('INT NEWS SCREEN - admin - factory - configurationFactory', () => {
  it('should create a valid instance', () => {
    const payload = {
      name: 'name',
      description: 'description',
      author: 'author',
    };
    const configuration = configurationFactory.createFromPayload(payload);
    expect(configuration).toBeDefined();
    expect(configuration.name).toBe(payload.name);
    expect(configuration.description).toBe(payload.description);
    expect(configuration.author).toBe(payload.author);
  });
  it('should create a valid instance with empty payload', () => {
    const configuration = configurationFactory.createFromPayload({});
    expect(configuration).toBeDefined();
    expect(configuration).toMatchObject({});
  });
  it('should create nothing if no payload', () => {
    const configuration = configurationFactory.createFromPayload(null);
    expect(configuration).toBeNull();
  });
});
