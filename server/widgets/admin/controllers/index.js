const router = require('express').Router({ mergeParams: true });
const privateController = require('./private');

router.use('/', privateController);

module.exports = router;
