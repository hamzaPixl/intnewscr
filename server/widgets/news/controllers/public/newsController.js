const router = require('express').Router({ mergeParams: true });
const { newsServices } = require('../../services');

router.get('/:source', (req, res, next) => newsServices
  .getBySource(req.params.source)
  .then(result => res.json(result))
  .catch(next)
);

module.exports = router;
