const express = require('express');

const publicController = require('./public');

const router = express.Router();

router.use('/api', publicController);

module.exports = router;
