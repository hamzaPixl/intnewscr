const express = require('express');
const services = require('../../services');

const router = express.Router();

router.get('/',
  (req, res, next) => services.weatherServices.weatherService
    .get(req.query)
    .then(res.jsend.success)
    .catch(next),
);

module.exports = router;
