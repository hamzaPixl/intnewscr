const router = require('express').Router({ mergeParams: true });

const weatherControllers = require('./weatherController');

router.use(
  weatherControllers,
);

module.exports = router;
