const low = require('lowdb');

function Controller () {
  this.widgets_db = low('./../database/widgets.json', {storage: require('lowdb/lib/storages/file-async')});
  this.views_db = low('./../database/views.json', {storage: require('lowdb/lib/storages/file-async')});
}

Controller.prototype = {

  /**
   * Get all widgets and views
   */
  getAll: function getAll () {
    return new Promise((resolve, reject) => {
      resolve({views:this.widgets_db.get('views').value(),widgets:this.widgets_db.get('widgets').value()});
    });
  },

};

module.exports = Controller;
