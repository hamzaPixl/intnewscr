const viewMapper = require('./viewMapper');

const mapOne = ({
  _id,
  name,
  description,
  author,
  views,
}) => ({
  id: _id,
  name,
  description,
  author,
  views: viewMapper.map(views),
});

const map = (configuratuions = []) => configuratuions.map(mapOne);

module.exports = {
  map,
  mapOne,
};
