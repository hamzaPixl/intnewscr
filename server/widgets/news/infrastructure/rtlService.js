const Rss = require('rss-parser');

const parser = new Rss();
const MAX_ITEMS = 10;
const URL_FEED = 'https://feeds.feedburner.com/Rtlinfos-ALaUne';

async function fetchNews() {
  const feed = await parser.parseURL(URL_FEED);
  return feed.items.map(f => ({
    source: 'rtl',
    link: f.link,
    content: f.content,
    title: f.title,
  })).slice(0, MAX_ITEMS);
}

module.exports = {
  fetchNews,
};
