const ViewItem = require('./models/ViewItem');
const low = require('lowdb');

class Controller {

  constructor() {
    this.db = low('./database/views.json', { storage: require('lowdb/lib/storages/file-async') });
  }

  /**
   * Get all widgets
   */
  getAll() {
    return new Promise((resolve, reject) => {
      resolve(this.db.get('views').value());
    });
  }

  /**
   * Create a view
   * @param params
   * @return {*}
   */
  createView(params) {
    return new Promise((resolve, reject) => {
      this.db.get('views').push(new ViewItem(`${params.view.name}${Date.now()}`,
        params.view.start, params.view.end, params.view.name, params.view.widgets)).write();
      resolve(this.getAll());
    });
  }

  /**
   * Update a view
   * @param params
   * @return {*}
   */
  updateView(params) {
    return new Promise((resolve, reject) => {
      this.db.get('views').find({ id: params.view.id })
        .assign({
          widgets: params.view.widgets,
          name: params.view.name,
          start: params.view.start,
          end: params.view.end,
        })
        .write();
      resolve(this.getAll());
    });
  }

  /**
   * Delete a view
   * @param params
   * @return {*}
   */
  deleteView(params) {
    return new Promise((resolve, reject) => {
      this.db.get('views').remove({ id: params.view.id })
        .write();
      resolve(this.getAll());
    });
  }

};

module.exports = Controller;
