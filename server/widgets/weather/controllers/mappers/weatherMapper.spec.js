const weatherMapper = require('./weatherMapper');

describe('INT NEWS SCREEN - WEATHER - mappers - weatherMapper', () => {
  it('should map an array of weather', () => {
    const payload = [{
      location: 'location',
      units: 'units',
      code: 'code',
      date: 'date',
      day: 'day',
      high: 5,
      low: 2,
      text: 'text',
    }];
    const weather = weatherMapper.map(payload);
    expect(weather).toBeDefined();
    expect(weather.length).toBe(1);
    expect(weather[0].location).toBe(payload[0].location);
    expect(weather[0].units).toBe(payload[0].units);
    expect(weather[0].code).toBe(payload[0].code);
    expect(weather[0].date).toBe(payload[0].date);
    expect(weather[0].day).toBe(payload[0].day);
    expect(weather[0].high).toBe(payload[0].high);
    expect(weather[0].low).toBe(payload[0].low);
    expect(weather[0].description).toBe(payload[0].text);
  });
  it('should map an empty array', () => {
    const weather = weatherMapper.map([]);
    expect(weather).toBeDefined();
    expect(weather.length).toBe(0);
  });
  it('should map nothing', () => {
    const weather = weatherMapper.map();
    expect(weather).toBeDefined();
    expect(weather.length).toBe(0);
  });
});
