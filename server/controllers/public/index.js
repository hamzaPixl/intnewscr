const router = require('express').Router({ mergeParams: true });

const weatherControllers = require('./weatherController');

router.use('/weather', weatherControllers);

module.exports = router;
