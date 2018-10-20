const config = require('config');
const router = require('express').Router({ mergeParams: true });
const { weatherServices } = require('../../services');
const { weatherValidator } = require('../validators');
const { weatherMapper } = require('../mappers');
const middlewares = require('../../../../middlewares/http');

router.get('/city/:city',
  middlewares.validateParamMiddleware(weatherValidator),
  (req, res, next) => weatherServices
  .get(req.params.city)
  .then(result => res.json(weatherMapper.map(result)))
  .catch(next)
);

router.get('/',
  (req, res, next) => weatherServices
  .get(config.get('services.weather.extras.city'))
  .then(result => res.json(weatherMapper.map(result)))
  .catch(next)
);

module.exports = router;
