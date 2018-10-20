const newsMapper = require('./newsMapper');

describe('INT NEWS SCREEN - NEWS - mappers - newsMapper', () => {
  it('should map an array of news', () => {
    const payload = [{
      source: 'source',
      link: 'link',
      content: 'content',
      title: 'title',
      createdAt: 'createdAt',
    }];
    const news = newsMapper.map(payload);
    expect(news).toBeDefined();
    expect(news.length).toBe(1);
    expect(news[0].source).toBe(payload[0].source);
    expect(news[0].link).toBe(payload[0].link);
    expect(news[0].content).toBe(payload[0].content);
    expect(news[0].title).toBe(payload[0].title);
    expect(news[0].date).toBe(payload[0].createdAt);
  });
  it('should map an empty array', () => {
    const news = newsMapper.map([]);
    expect(news).toBeDefined();
    expect(news.length).toBe(0);
  });
  it('should map nothing', () => {
    const news = newsMapper.map();
    expect(news).toBeDefined();
    expect(news.length).toBe(0);
  });
});
