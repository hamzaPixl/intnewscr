const express = require('express');
const widgets = require('../widgets');

const router = express.Router();

// weather widget
router.use(widgets.weather.path, widgets.weather.controllers);

module.exports = router;
