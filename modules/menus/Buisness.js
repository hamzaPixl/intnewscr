function Buisness (services, config) {
  this.services = services;
  this.config = config;
  Object.keys(this.services).map((serviceKey) => {
    this[serviceKey] = require(this.services[serviceKey].name);
    return this;
  });
}

Buisness.prototype = {

  /**
   * It search the menus from a source
   * @see Buisness::getMenusFromGustine
   * @see Buisness::getMenusFromBarASoupe
   * @return Promise with data
   */
  getMenu: function getMenu (source) {
    switch (source) {
      case 'gustine' :
        return this.getMenusFromGustine();
      case 'barasoupe' :
        return this.getMenusFromBarASoupe();
      default:
        return null;
    }
  },

  /**
   * It search the menus from gustine using facebook
   * @see Facebook:getToken
   * @private
   * @return Promise with data
   */
  getMenusFromGustine: function getMenusFromGustine () {
    return new Promise((resolve, reject) => {
      const request = new this.RequestModel('/facebook/token', '/token', null);
      const controller = new this.Controller();
      controller.request(request).then((data) => {
        this.fb.setAccessToken(data[0].token);
        this.fb.api(
          `${this.config.gustine}/posts?limit=1`,
          'GET', {},
          (response) => {
            if (response.data) {
              resolve(response.data);
            } else {
              reject(response);
            }
          });
      }).catch((err) => {
        reject(err);
      });
    });
  },

  /**
   * It search the menus from bar à soupe using url
   * @private
   * @return Promise with data
   */
  getMenusFromBarASoupe: function getMenusFromBarASoupe () {
    return this.scrapping(this.config.barasoupe);
  },

  /**
   * This function scrapp the HTML code to exports data
   * @param url is the link to retreive data
   * @private
   * @return  the promis that contains data
   */
  scrapping: function scrapping (url) {
    return new Promise((resolve, reject) => {
      this.request(url, (error, response, body) => {
        if (!error && response.statusCode === 200) {
          const $ = this.cheerio.load(body);
          this.cheerioTableparser($);
          resolve(this.formatData($));
        } else {
          reject(error);
        }
      });
    });
  },

  /**
   * It parse the data from the table to an array
   * @private
   * @param $
   * @returns {Array}
   */
  formatData: function formatData ($) {
    const data = [];
    $('tr').each((i, tr) => {
      const children = $(tr).children();
      const row = {
        jour: children.eq(0).text(),
        soupe: `${children.eq(1).text()} & ${children.eq(2).text()}`,
        suggestion: children.eq(3).text(),
      };
      data.push(row);
    });
    // remove the first item because it is the header of the table
    data.shift();
    return data;
  },
};

module.exports = Buisness;
