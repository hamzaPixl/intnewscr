const request = require('superagent');
const config = require('config');
const weather = require('../../services/__mocks__/weather.json');
const weatherMapper = require('../../controllers/mappers/weatherMapper');

describe('INT NEWS SCREEN - NEWS - integration tests - weatherController', () => {
  test('Get weather ', (done) => {
    request.get(`${config.get('server.http')}/weathers`)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toBeDefined();
        expect(res.body.length).toBe(2);
        expect(res.body).toMatchObject(weatherMapper.map(weather));
        done();
      });
  });
  test('Get weather with a city', (done) => {
    request.get(`${config.get('server.http')}/weathers/city/anvers`)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toBeDefined();
        expect(res.body.length).toBe(2);
        expect(res.body).toMatchObject(weatherMapper.map(weather));
        done();
      });
  });
  test('Get weather with no city', (done) => {
    request.get(`${config.get('server.http')}/weathers/city`)
      .end((err, res) => {
        expect(err).toBeDefined();
        expect(res.body.status).toBe(404);
        expect(res.body.name).toBe('NotFoundError');
        done();
      });
  });
});
