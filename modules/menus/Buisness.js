function Buisness(services, config) {
  this.services = services;
  this.config = config;
  Object.keys(this.services).map((serviceKey) => {
    this[serviceKey] = require(this.services[serviceKey].name);
    return this;
  });
  this.RequestModel = require('./../../core/Request');
  this.Controller = require('./../../core/controllers/Controller');
}

Buisness.prototype = {

    /**
     * It search the menus from a source
     * @see Buisness::getMenusFromGustine
     * @see Buisness::getMenusFromBarASoupe
     * @return Promise with data
     */
  getMenu: function getMenu(source) {
    if (source === 'gustine') {
      return this.getMenusFromGustine();
    } else if (source === 'barasoupe') {
      return this.getMenusFromBarASoupe();
    }
    return null;
  },
  /**
     * It search the menus from gustine using facebook
     * @see Facebook:getToken
     * @private
     * @return Promise with data
     */
  getMenusFromGustine: function getMenusFromGustine() {
    return new Promise((resolve, reject) => {
      const request = new this.RequestModel();
      request.setpath('/token').setbaseUrl('/facebook/token');
      const controller = new this.Controller();
      controller.request(request).then((data) => {
        this.fb.setAccessToken(data.access_token);
        this.fb.api(
          `${this.config.gustine}/feed`,
            'GET', {},
            (response) => {
              if (response) {
                reject(response);
              } else {
                resolve(response);
              }
            }
        );
      }, (err) => {
        console.log(err);
      });
    });
  },
  /**
     * It search the menus from bar à soupe using url
     * @private
     * @return Promise with data
     */
  getMenusFromBarASoupe: function getMenusFromBarASoupe() {
    return this.scrapping(this.config.barasoupe);
  },
/**
     * This function scrapp the HTML code to exports data
     * @param url is the link to retreive data
     * @private
     * @return  the promis that contains data
     */
  scrapping: function scrapping(url) {
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
   */
  formatData: function formatData($) {
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
    /**
     * remove the first item becase it is the header of the table
     * */
    data.shift();
    return data;
  },
};

module.exports = Buisness;
