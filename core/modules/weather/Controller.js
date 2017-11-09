const express = require('express');
const { weatherServices } = require('../../services');

const router = express.Router();

router.get('/:city',
  (req, res, next) => weatherServices
    .get(req.params, req.app.locals.db)
    .then(result => res.status(200).json(result))
    .catch(next)
);

module.exports = router;
