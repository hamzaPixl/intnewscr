const WidgetItem = require('./models/WidgetItem');
const Request = require('./../Request');
const low = require('lowdb');

function Controller () {
  this.db = low('./database/widgets.json', {storage: require('lowdb/lib/storages/file-async')});
}

Controller.prototype = {

  /**
   * Get all widgets
   */
  getAll: function getAll () {
    return new Promise((resolve, reject) => {
      resolve(this.db.get('widgets').value());
    });
  },

  /**
   * Create a widget
   * @param params
   * @return {*}
   */
  createWidget: function createWidget (params) {
    return new Promise((resolve, reject) => {
      let param;
      if (typeof params.widget.params === 'string') {
        param = JSON.parse(params.widget.params);
      } else {
        param = params.widget.params;
      }
      const widget = new WidgetItem(`${params.widget.name}${Date.now()}`,
        params.widget.ttl, params.widget.name,
        new Request(params.widget.baseUrl, params.widget.path,
          param));
      this.db.get('widgets').push(widget).write();
      resolve(this.getAll());
    });
  },

  /**
   * Update a widget
   * @param params
   * @return {*}
   */
  updateWidget: function updateWidget (params) {
    return new Promise((resolve, reject) => {
      this.db.get('widgets').find({id: params.id})
        .assign({request: params.request})
        .write();
      resolve(this.getAll());
    });
  },

  /**
   * Delete a widgets
   * @param params
   * @return {*}
   */
  deleteWidget: function deleteWidget (params) {
    return new Promise((resolve, reject) => {
      this.db.get('widgets').remove({id: params.widget.id})
        .write();
      resolve(this.getAll());
    });
  },

};

module.exports = Controller;
