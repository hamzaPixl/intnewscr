const express = require('express');
const services = require('../../services');

const router = express.Router();

router.get('/',
  (req, res, next) => services.weatherServices.weatherService
    .get(req.app.locals.db)
    .then(result => res.status(200).json(result))
    .catch(next)
);

module.exports = router;
