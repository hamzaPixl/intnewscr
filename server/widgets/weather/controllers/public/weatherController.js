const router = require('express').Router({ mergeParams: true });
const config = require('config');
const { weatherServices } = require('../../services');

router.get('/city/:city',
  (req, res, next) => weatherServices
    .get(req.params.city)
    .then(result => res.json(result))
    .catch(next)
);

router.get('/', (req, res, next) => weatherServices
  .get(config.get('services.weather.extra.city'))
  .then(result => res.json(result))
  .catch(next)
);

module.exports = router;
