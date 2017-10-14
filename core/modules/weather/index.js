const express = require('express');
const Controller = require('./Controller');

const router = express.Router();
const controller = new Controller();

router.route('/').get(controller.getWeather);

module.exports = router;
