const router = require('express').Router({ mergeParams: true });
const { usersServices } = require('../../services');
const { userValidator } = require('../validators');
const { userMapper } = require('../mappers');
const middlewares = require('../../../../middlewares/http');

router.get('/me',
  (req, res, next) => usersServices.getProfil(req.user)
  .then(user => res.json(userMapper.mapOne(user)))
  .catch(next)
);

router.post('/',
  middlewares.validateContentMiddleware(userValidator),
  (req, res, next) => usersServices
  .addUser(req.user, req.body)
  .then(user => res.json(userMapper.mapOne(user)))
  .catch(next)
);

router.get('/',
  (req, res, next) => usersServices
  .getAllUsers(req.user)
  .then(users => res.json(userMapper.map(users)))
  .catch(next)
);

router.get('/:email',
  (req, res, next) => usersServices
  .getUser(req.user, req.params.email)
  .then(user => res.json(userMapper.mapOne(user)))
  .catch(next)
);

router.put('/:email',
  (req, res, next) => usersServices
  .updateUser(req.user, req.params.email, req.body)
  .then(user => res.json(userMapper.mapOne(user)))
  .catch(next)
);

router.delete('/:email',
  (req, res, next) => usersServices
  .deleteUser(req.user, req.params.email)
  .then(() => res.json({}))
  .catch(next)
);

module.exports = router;
