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

  createWidget: function createWidget (params) {
    const widget = new WidgetItem(Date.now(), params.ttl, params.name, params.request);
    this.db.push(widget)
      .write();
    return this.getAll();
  },

};

module.exports = Controller;
