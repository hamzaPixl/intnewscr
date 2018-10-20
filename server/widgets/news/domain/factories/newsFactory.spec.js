const newsFactory = require('./newsFactory');

describe('INT NEWS SCREEN - NEWS - factory - newsFactory', () => {
  it('should create a valid instance', () => {
    const payload = {
      source: 'source',
      link: 'link',
      content: 'content',
      title: 'title',
    };
    const news = newsFactory.createFromPayload(payload);
    expect(news).toBeDefined();
    expect(news.source).toBe(payload.source);
    expect(news.link).toBe(payload.link);
    expect(news.content).toBe(payload.content);
    expect(news.title).toBe(payload.title);
  });
  it('should create a valid instance with empty payload', () => {
    const news = newsFactory.createFromPayload({});
    expect(news).toBeDefined();
    expect(news).toMatchObject({});
  });
  it('should create nothing if no payload', () => {
    const news = newsFactory.createFromPayload(null);
    expect(news).toBeNull();
  });
});
