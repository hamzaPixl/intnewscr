const newsService = require('./newsService');
const news = require('./news.json');

describe('INT NEWS SCREEN - NEWS - services mock - newsService', () => {
  it('should always get news', async () => {
    const resultService = await newsService.getBySource();
    expect(resultService).toBeDefined();
    expect(news.length).toBe(resultService.length);
    expect(news).toMatchObject(resultService);
  });
  it('should always get sources', async () => {
    const resultService = await newsService.getSources();
    expect(resultService).toBeDefined();
    expect(resultService.length).toBe(1);
    expect(['rtl']).toMatchObject(resultService);
  });
});
