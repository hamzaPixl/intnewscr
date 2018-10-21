const request = require('superagent');
const config = require('config');
const news = require('../../services/__mocks__/news.json');
const newsMapper = require('../../controllers/mappers/newsMapper');

describe('INT NEWS SCREEN - NEWS - integration tests - newsController', () => {
  test('Get news for valid source', (done) => {
    request.get(`${config.get('server.http')}/news/rtl`)
      .end((err, res) => {
        expect(err).toBeNull();
        expect(res.body).toBeDefined();
        expect(res.body.length).toBe(2);
        expect(res.body).toMatchObject(newsMapper.map(news));
        done();
      });
  });
  test('Get news with invalid source', (done) => {
    request.get(`${config.get('server.http')}/news/kkk`)
      .end((err, res) => {
        expect(err).toBeDefined();
        expect(res.body.status).toBe(400);
        expect(res.body.name).toBe('ValidationError');
        expect(res.body.code).toBe('JSON-SCHEMA');
        done();
      });
  });
  test('Get news with no source', (done) => {
    request.get(`${config.get('server.http')}/news`)
      .end((err, res) => {
        expect(err).toBeDefined();
        expect(res.body.status).toBe(404);
        expect(res.body.name).toBe('NotFoundError');
        done();
      });
  });
});
