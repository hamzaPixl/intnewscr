const router = require('express').Router({ mergeParams: true });
const { usersServices } = require('../../services');
const { userMapper } = require('../mappers');

router.get('/me',
  (req, res, next) => usersServices.getProfil(req.user)
  .then(user => res.json(userMapper.mapOne(user)))
  .catch(next)
);

module.exports = router;
