const ApiError = require('./ApiError');

describe('INT NEWS SCREEN - models - errors - ApiError', () => {
  it('should create a valid instance', () => {
    const error = new ApiError();
    expect(error).toBeDefined();
    expect(error.message).toBe('API error');
    expect(error.name).toBe('ApiError');
  });
  it('should create a valid instance with specific message', () => {
    const error = new ApiError('Specific message');
    expect(error).toBeDefined();
    expect(error.message).toBe('Specific message');
    expect(error.name).toBe('ApiError');
  });
});
