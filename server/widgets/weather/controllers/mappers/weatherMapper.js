const mapOne = ({
  location,
  units,
  code,
  date,
  day,
  high,
  low,
  text,
}) => ({
  code,
  location,
  units,
  day,
  high,
  low,
  date,
  description: text,
});

const map = (weathers = []) => weathers.map(mapOne);

module.exports = {
  map,
  mapOne,
};
