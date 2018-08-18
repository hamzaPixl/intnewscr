const express = require('express');

const publicController = require('./public');
const privateController = require('./private');

const router = express.Router();

router.use('/api', publicController);
router.use('/admin', privateController);

module.exports = router;
