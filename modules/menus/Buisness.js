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
      /**
       * todo
       */
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
          const data = $('.tg-table-plain').parsetable(true, true, true);
          const ob = [];
          for (let i = 1; i < data[0].length; i += 1) {
            ob.push({ jour: data[0][i], soupe: `${data[1][i]} & ${data[2][i]}`, suggestion: data[3][i] });
          }
          resolve(ob);
        } else {
          reject(error);
        }
      });
    });
  },


};

module.exports = Buisness;
