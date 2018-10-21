const weatherService = require('./weatherService');
const weather = require('./weather.json');

describe('INT NEWS SCREEN - weather - services mock - weatherService', () => {
  it('should always get weather', async () => {
    const resultService = await weatherService.get();
    expect(resultService).toBeDefined();
    expect(weather.length).toBe(resultService.length);
    expect(weather).toMatchObject(resultService);
  });
});
