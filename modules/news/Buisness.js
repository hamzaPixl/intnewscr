/**
 * This constructor use params to be able to call api
 * @param config is the array object that contains all value as variable, url ..
 * @param services is used to require services that the module need
 * */
function Buisness(services, config) {
  this.services = services;
  this.config = config;
  Object.keys(this.services).map((serviceKey) => {
    this[serviceKey] = require(this.services[serviceKey].name);
    return this;
  });
}

Buisness.prototype = {
  getNews: function getNews(params) {
    if (params.language === 'fr') {
      return this.getNewsFr();
    } else if (params.language === 'nl') {
      return this.getNewsNl();
    }
    return null;
  },
  getNewsFr: function getNewsFr() {
    return new Promise((resolve, reject) => {
      this.rss.parseURL(this.config.url_fr, (err, parsed) => {
        if (err) {
          reject(err);
        } else {
          resolve(parsed.feed.entries.slice(0, 3));
        }
      });
    });
  },
  getNewsNl: function getNewsNl() {
    return new Promise((resolve, reject) => {
      this.rss.parseURL(this.config.url_nl, (err, parsed) => {
        if (err) {
          reject(err);
        } else {
          resolve(parsed.feed.entries.slice(0, 3));
        }
      });
    });
  },
  getNewsApi: function getNewsApi(params) {
    const url = this.config.url_api.replace('sourceinput', params.source);
    return new Promise((resolve, reject) => {
      this.request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const res = JSON.parse(body);
          resolve(res.articles.slice(0, 3));
        } else {
          reject(error);
        }
      });
    });
  },
  getNewsTrafic: function getNewsTrafic() {
    return new Promise((resolve, reject) => {
      this.rss.parseURL(this.config.url_trafic, (err, parsed) => {
        if (err) {
          reject(err);
        } else {
          resolve(parsed.feed.entries.slice(0, 6));
        }
      });
    });
  },
};

module.exports = Buisness;
