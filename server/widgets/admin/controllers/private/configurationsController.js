const router = require('express').Router({ mergeParams: true });
const { configurationsServices } = require('../../services');
const { configurationsValidator, viewValidator } = require('../validators');
const { configurationsMapper, viewMapper } = require('../mappers');
const middlewares = require('../../../../middlewares/http');

router.post('/',
  middlewares.validateContentMiddleware(configurationsValidator),
  (req, res, next) => configurationsServices
  .createConfiguration(req.user, req.body)
  .then(configuration => res.json(configurationsMapper.mapOne(configuration)))
  .catch(next)
);

router.get('/',
  (req, res, next) => configurationsServices
  .getAllConfigurations(req.user)
  .then(configurations => res.json(configurationsMapper.map(configurations)))
  .catch(next)
);

router.get('/:configurationId',
  (req, res, next) => configurationsServices
  .getConfiguration(req.user, req.params.configurationId)
  .then(configuration => res.json(configurationsMapper.mapOne(configuration)))
  .catch(next)
);

router.put('/:configurationId',
  (req, res, next) => configurationsServices
  .updateConfiguration(req.user, req.params.configurationId, req.body)
  .then(configuration => res.json(configurationsMapper.mapOne(configuration)))
  .catch(next)
);

router.delete('/:configurationId',
  (req, res, next) => configurationsServices
  .deleteConfiguration(req.user, req.params.configurationId)
  .then(() => res.json({}))
  .catch(next)
);

// VIEWS

router.post('/:configurationId/views',
  middlewares.validateContentMiddleware(viewValidator),
  (req, res, next) => configurationsServices
  .addView(req.user, req.params.configurationId, req.body)
  .then(view => res.json(viewMapper.mapOne(view)))
  .catch(next)
);

router.get('/:configurationId/views/:viewId',
  (req, res, next) => configurationsServices
  .getView(req.user, req.params.configurationId, req.params.viewId)
  .then(view => res.json(viewMapper.mapOne(view)))
  .catch(next)
);

router.put('/:configurationId/views/:viewId',
  (req, res, next) => configurationsServices
  .updateView(req.user, req.params.configurationId, req.params.viewId, req.body)
  .then(view => res.json(viewMapper.mapOne(view)))
  .catch(next)
);

router.delete('/:configurationId/views/:viewId',
  (req, res, next) => configurationsServices
  .deleteView(req.user, req.params.configurationId, req.params.viewId)
  .then(() => res.json({}))
  .catch(next)
);

module.exports = router;
