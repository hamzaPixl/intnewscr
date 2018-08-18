const router = require('express').Router({ mergeParams: true });

const weatherControllers = require('./weatherController');

router.use('/weathers', weatherControllers);

module.exports = router;
