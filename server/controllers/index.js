const express = require('express');
const widgets = require('../widgets');

const router = express.Router();

// weather widget
router.use(widgets.weather.path, widgets.weather.controllers);

// news widget
router.use(widgets.news.path, widgets.news.controllers);

// admin widget
router.use(widgets.admin.path, widgets.admin.controllers);

module.exports = router;
