const router = require('express').Router({ mergeParams: true });

const whiteLabelController = require('./whiteLabelController');

router.use('/white-labels', whiteLabelController);

module.exports = router;
