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
   * @return Promise that contains data
   */
  getMenu: function getMenu (params) {
    const menus = this.repository.findAllBy('source', params.source);
    return new Promise((resolve, reject) => {
      if (this.repository.resultIsValid(menus)) {
        resolve(menus);
      } else {
        this.buisness.getMenu(params.source).then((menuBuis) => {
          if (!menuBuis) {
            reject(menuBuis);
          }
          this.repository.saveAll(menuBuis);
          resolve(this.repository.findAllBy('source', params.source));
        }).catch((err) => {reject(err);});
      }
    });
  },


};

module.exports = Controller;
