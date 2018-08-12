const express = require('express');
const { weatherServices } = require('../../services');

const router = express.Router({ mergeParams: true });

router.get('city/:city',
  (req, res, next) => weatherServices
    .get(req.params)
    .then(result => res.json(result))
    .catch(next)
);

module.exports = router;
