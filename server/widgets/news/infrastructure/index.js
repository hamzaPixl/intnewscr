const rtlService = require('./rtlService');

const sources = [
  {
    name: 'rtl',
    service: rtlService,
  },
];

function fetchNews(source) {
  const sourceService = sources.find(s => s.name === source).service;
  return sourceService.fetchNews();
}

module.exports = {
  fetchNews,
};
