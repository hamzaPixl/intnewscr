const weatherFactory = require('./weatherFactory');

describe('INT NEWS SCREEN - weather - factory - weatherFactory', () => {
  it('should create a valid instance', () => {
    const payload = {
      location: 'location',
      units: 'units',
      code: 'code',
      date: 'date',
      day: 'day',
      high: 5,
      low: 2,
      text: 'text',
    };
    const weather = weatherFactory.createFromPayload(payload);
    expect(weather).toBeDefined();
    expect(weather.location).toBe(payload.location);
    expect(weather.units).toBe(payload.units);
    expect(weather.code).toBe(payload.code);
    expect(weather.date).toBe(payload.date);
    expect(weather.day).toBe(payload.day);
    expect(weather.high).toBe(payload.high);
    expect(weather.low).toBe(payload.low);
    expect(weather.text).toBe(payload.text);
  });
  it('should create a valid instance with empty payload', () => {
    const weather = weatherFactory.createFromPayload({});
    expect(weather).toBeDefined();
    expect(weather).toMatchObject({});
  });
  it('should create nothing if no payload', () => {
    const weather = weatherFactory.createFromPayload(null);
    expect(weather).toBeNull();
  });
});
