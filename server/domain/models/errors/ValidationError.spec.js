const ValidationError = require('./ValidationError');

describe('INT NEWS SCREEN - models - errors - ValidationError', () => {
  it('should create a valid instance', () => {
    const error = new ValidationError();
    expect(error).toBeDefined();
    expect(error.message).toBe('Validation Error');
    expect(error.name).toBe('ValidationError');
  });
  it('should create a valid instance with specific message', () => {
    const error = new ValidationError('Specific message');
    expect(error.message).toBe('Specific message');
    expect(error.name).toBe('ValidationError');
  });
  it('should create a valid instance with specific details', () => {
    const error = new ValidationError('Specific message', {}, { a: 4 });
    expect(error.message).toBe('Specific message');
    expect(error.name).toBe('ValidationError');
    expect(error.details).toMatchObject({ a: 4 });
  });
});
