const low = require('lowdb');

function Controller () {
  this.widgets_db = low('./../database/widgets.json', {storage: require('lowdb/lib/storages/file-async')});
  this.views_db = low('./../database/views.json', {storage: require('lowdb/lib/storages/file-async')});
}

Controller.prototype = {

  /**
   * Get all widgets
   */
  getAllWidgets: function getAllWidgets () {
    return new Promise((resolve, reject) => {
      resolve(this.widgets_db.get('widgets').value());
    });
  },

  /**
   * Get all views
   */
  getAllViews: function getAllViews () {
    return new Promise((resolve, reject) => {
      resolve(this.views_db.get('views').value());
    });
  },

};

module.exports = Controller;
