const express = require('express');
const Controller = require('./Controller');

const router = express.Router();

router.route('/', Controller);

module.exports = router;
