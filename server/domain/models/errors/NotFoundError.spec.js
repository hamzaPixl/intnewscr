const NotFoundError = require('./NotFoundError');

describe('INT NEWS SCREEN - models - errors - NotFoundError', () => {
  it('should create a valid instance', () => {
    const error = new NotFoundError();
    expect(error).toBeDefined();
    expect(error.message).toBe('Not Found Error');
    expect(error.name).toBe('NotFoundError');
  });
  it('should create a valid instance with specific message', () => {
    const error = new NotFoundError('Specific message');
    expect(error).toBeDefined();
    expect(error.message).toBe('Specific message');
    expect(error.name).toBe('NotFoundError');
  });
});
