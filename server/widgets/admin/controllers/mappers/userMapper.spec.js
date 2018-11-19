const userMapper = require('./userMapper');

describe('INT NEWS SCREEN - ADMIN - mappers - userMapper', () => {
  it('should map an array of user', () => {
    const payload = [{
      _id: 'id',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
    }];
    const user = userMapper.map(payload);
    expect(user).toBeDefined();
    expect(user.length).toBe(1);
    expect(user[0].email).toBe(payload[0].email);
    expect(user[0].avatar).toBeDefined();
    expect(user[0].id).toBe(payload[0]._id);
    expect(user[0].firstName).toBe(payload[0].firstName);
    expect(user[0].lastName).toBe(payload[0].lastName);
    expect(user[0].date).toBe(payload[0].createdAt);
  });
  it('should map an empty array', () => {
    const user = userMapper.map([]);
    expect(user).toBeDefined();
    expect(user.length).toBe(0);
  });
  it('should map nothing', () => {
    const user = userMapper.map();
    expect(user).toBeDefined();
    expect(user.length).toBe(0);
  });
});
