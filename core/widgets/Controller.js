const WidgetItem = require('./models/WidgetItem');
const low = require('lowdb');

function Controller () {
  this.db = low('./database/widgets.json', {storage: require('lowdb/lib/storages/file-async')});
}

Controller.prototype = {

  /**
   * Get all widgets
   */
  getAll: function getAll () {
    return this.db.get('widgets').value();
  },

  /**
   * Create a widget
   * @param params
   * @return {*}
   */
  createWidget: function createWidget (params) {
    const widget = new WidgetItem(params.name + Date.now(), params.ttl, params.name, params.request);
    this.db.push(widget).write();
    return this.getAll();
  },

  /**
   * Update a widget
   * @param params
   * @return {*}
   */
  updateWidget: function updateWidget (params) {
    this.db.find({id: params.id})
      .assign({request: params.request})
      .write();
    return this.getAll();
  },

  /**
   * Delete a widgets
   * @param params
   * @return {*}
   */
  deleteWidget: function deleteWidget (params) {
    this.db.remove({id: params.id})
      .write();
    return this.getAll();
  },

};

module.exports = Controller;
