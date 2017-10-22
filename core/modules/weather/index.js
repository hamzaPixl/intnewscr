const express = require('express');
const Controller = require('./Controller');

const router = express.Router();

router.use('/', Controller);

module.exports = router;
