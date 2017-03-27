const Buisness = require('./Buisness');
const Repository = require('./../../core/models/Repository');
const MenusItem = require('./models/MenusItem');

function Controller (config, services) {
  this.config = config;
  this.services = services;
  this.buisness = new Buisness(this.services, this.config);
  this.repository = new Repository(MenusItem);
}

Controller.prototype = {

  /**
   * Call the buisness if there are no data in database
   * else it return the data that the databse contains
   * @return Promis that contains data
   */
  getMenu: function getMenu (params) {
    const menus = this.repository.findAllBy('source', params.source);
    return new Promise((resolve, reject) => {
      if (menus && menus.length > 0) {
        resolve(menus);
      } else if (!menus || menus.length === 0) {
        this.buisness.getMenu(params.source).then((menuBuis) => {
          if (!menuBuis) {
            reject(menuBuis);
          }
          this.repository.saveAll(menuBuis);
          resolve(this.repository.findAll());
        });
      } else {
        resolve(null);
      }
    });
  },
};

module.exports = Controller;
