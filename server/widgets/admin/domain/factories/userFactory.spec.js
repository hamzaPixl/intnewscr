const userFactory = require('./userFactory');

describe('INT NEWS SCREEN - admin - factory - userFactory', () => {
  it('should create a valid instance', () => {
    const payload = {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      password: 'password',
      role: 'role',
    };
    const user = userFactory.createFromPayload(payload);
    expect(user).toBeDefined();
    expect(user.firstName).toBe(payload.firstName);
    expect(user.lastName).toBe(payload.lastName);
    expect(user.email).toBe(payload.email);
    expect(user.password).toBe(payload.password);
    expect(user.role).toBe(payload.role);
  });
  it('should create a valid instance with empty payload', () => {
    const user = userFactory.createFromPayload({});
    expect(user).toBeDefined();
    expect(user).toMatchObject({});
  });
  it('should create nothing if no payload', () => {
    const user = userFactory.createFromPayload(null);
    expect(user).toBeNull();
  });
});
