const ViewItem = require('./models/ViewItem');
const low = require('lowdb');

function Controller () {
  this.db = low('./database/views.json', {storage: require('lowdb/lib/storages/file-async')});
}

Controller.prototype = {

  /**
   * Get all widgets
   */
  getAll: function getAll () {
    return new Promise((resolve, reject) => {
      resolve(this.db.get('views').value());
    });
  },

  /**
   * Create a view
   * @param params
   * @return {*}
   */
  createView: function createView (params) {
    return new Promise((resolve, reject) => {
      this.db.get('views').push(new ViewItem(`${params.view.name}${Date.now()}`,
        params.view.ttl, params.view.name, params.view.widgets)).write();
      resolve(this.getAll());
    });
  },

  /**
   * Update a view
   * @param params
   * @return {*}
   */
  updateView: function updateView (params) {
    return new Promise((resolve, reject) => {
      this.db.get('views').find({id: params.view.id})
        .assign({
          widgets: params.view.widgets,
          name: params.view.name,
          ttl: params.view.ttl
        })
        .write();
      resolve(this.getAll());
    });
  },

  /**
   * Delete a view
   * @param params
   * @return {*}
   */
  deleteView: function deleteView (params) {
    return new Promise((resolve, reject) => {
      this.db.get('views').remove({id: params.view.id})
        .write();
      resolve(this.getAll());
    });
  },

};

module.exports = Controller;
