const express = require('express');
const { whiteLabelServices } = require('../../services');

const router = express.Router({ mergeParams: true });

router.get('/:id',
  (req, res, next) => whiteLabelServices
    .get(req.params.id)
    .then(result => res.json(result))
    .catch(next)
);

router.post('/',
  (req, res, next) => whiteLabelServices
    .create(req.body)
    .then(result => res.json(result))
    .catch(next)
);

router.put('/:id',
  (req, res, next) => whiteLabelServices
    .update(req.params.id, req.body)
    .then(result => res.json(result))
    .catch(next)
);

router.delete('/:id',
  (req, res, next) => whiteLabelServices
    .remmove(req.params.id)
    .then(result => res.json(result))
    .catch(next)
);

module.exports = router;
