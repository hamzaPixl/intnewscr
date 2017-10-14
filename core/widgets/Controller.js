const WidgetItem = require('./models/WidgetItem');
const Request = require('./../Request');
const low = require('lowdb');

class Controller {
  constructor() {
    this.db = low('./database/widgets.json', { storage: require('lowdb/lib/storages/file-async') });
  }

  /**
   * Get all widgets
   */
  getAll() {
    return new Promise((resolve, reject) => {
      resolve(this.db.get('widgets').value());
    });
  }

  /**
   * Create a widget
   * @param params
   * @return {*}
   */
  createWidget(params) {
    return new Promise((resolve, reject) => {
      let param;
      if (typeof params.widget.params === 'string') {
        param = JSON.parse(params.widget.params);
      } else {
        param = params.widget.params;
      }
      this.db.get('widgets').push(new WidgetItem(`${params.widget.name}${Date.now()}`,
        params.widget.ttl, params.widget.name,
        new Request(params.widget.baseUrl, params.widget.path,
          param))).write();
      resolve(this.getAll());
    });
  }

  /**
   * Update a widget
   * @param params
   * @return {*}
   */
  updateWidget(params) {
    return new Promise((resolve, reject) => {
      let param;
      if (typeof params.widget.params === 'string') {
        param = JSON.parse(params.widget.params);
      } else {
        param = params.widget.params;
      }
      this.db.get('widgets').find({ id: params.widget.id })
        .assign({
          request: new Request(params.widget.baseUrl, params.widget.path,
            param),
          name: params.widget.name,
          ttl: params.widget.ttl,
        })
        .write();
      resolve(this.getAll());
    });
  }

  /**
   * Delete a widgets
   * @param params
   * @return {*}
   */
  deleteWidget(params) {
    return new Promise((resolve, reject) => {
      this.db.get('widgets').remove({ id: params.widget.id })
        .write();
      resolve(this.getAll());
    });
  }

};

module.exports = Controller;
