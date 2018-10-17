const router = require('express').Router({ mergeParams: true });
const publicController = require('./public');

router.use('/', publicController);

module.exports = router;
