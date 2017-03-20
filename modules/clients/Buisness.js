function Buisness(services, config) {
  this.services = services;
  this.config = config;
  Object.keys(this.services).map((serviceKey) => {
    this[serviceKey] = require(this.services[serviceKey].name);
    return this;
  });
}

Buisness.prototype = {

     /**
     * It search the 2 latest news of the source on google
     * @param source is the query search
     * @return Promise with data
     */
  getGooglePosts: function getGooglePosts(source) {
    return new Promise((resolve, reject) => {
      const url = this.config.url.replace('source', source);
      this.rss.parseURL(url, (err, parsed) => {
        if (err) {
          reject(err);
        } else {
          const result = parsed.feed.entries.map((item) => { const temp = item; temp.source = source; return temp; });
          resolve(result.slice(0, 2));
        }
      });
    });
  },
     /**
     * It search the 2 latest post of the source on facebook
     * @param sourceid is the page id of the client
     * @return Promise with data
     */
  getFacebookPosts: function getFacebookPosts(sourceId) {
    return new Promise((resolve, reject) => {
      const request = new this.RequestModel('/facebook/token', '/token', null);
      const controller = new this.Controller();
      controller.request(request).then((data) => {
        this.fb.setAccessToken(data[0].token);
        this.fb.api(`${sourceId}/posts?limit=2`, 'GET', {}, (response) => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject(response);
          }
        });
      });
    });
  },

};

module.exports = Buisness;
