const router = require('express').Router({ mergeParams: true });

const newsControllers = require('./newsController');

router.use('/', newsControllers);

module.exports = router;
