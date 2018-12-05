const mapOne = ({
  _id,
  name,
  widget,
  path,
  queryParams,
}) => ({
  id: _id,
  name,
  widget,
  path,
  queryParams,
});

const map = (views = []) => views.map(mapOne);

module.exports = {
  map,
  mapOne,
};
