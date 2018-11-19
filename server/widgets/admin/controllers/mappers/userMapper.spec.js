const userMapper = require('./userMapper');

describe('INT NEWS SCREEN - ADMIN - mappers - userMapper', () => {
  it('should map an array of user', () => {
    const payload = [{
      source: 'source',
      link: 'link',
      content: 'content',
      title: 'title',
      createdAt: 'createdAt',
    }];
    const user = userMapper.map(payload);
    expect(user).toBeDefined();
    expect(user.length).toBe(1);
    expect(user[0].source).toBe(payload[0].source);
    expect(user[0].link).toBe(payload[0].link);
    expect(user[0].content).toBe(payload[0].content);
    expect(user[0].title).toBe(payload[0].title);
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
