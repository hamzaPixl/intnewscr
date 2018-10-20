const mapOne = ({
  source,
  link,
  content,
  title,
  createdAt,
}) => ({
  source,
  link,
  content,
  title,
  date: createdAt,
});

const map = (news = []) => news.map(mapOne);

module.exports = {
  map,
  mapOne,
};
