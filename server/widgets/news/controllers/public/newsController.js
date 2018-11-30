const router = require('express').Router({ mergeParams: true });
const { newsServices } = require('../../services');
const { newsValidator } = require('../validators');
const { newsMapper } = require('../mappers');
const middlewares = require('../../../../middlewares/http');

router.get('/sources',
  (req, res, next) => newsServices
  .getSources()
  .then(result => res.json(result))
  .catch(next)
);

router.get('/:source',
  middlewares.validateParamMiddleware(newsValidator),
  (req, res, next) => newsServices
  .getBySource(req.params)
  .then(result => res.json(newsMapper.map(result)))
  .catch(next)
);

module.exports = router;
