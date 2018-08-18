const express = require('express');
const config = require('config');
const { weatherServices } = require('../../services');

const router = express.Router({ mergeParams: true });

router.get('/paths', (req, res, next) => res.json(['/', '/city/:city']));

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
