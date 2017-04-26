const fs = require('fs');

function Repository (Model, databasePath) {
  this.Model = Model;
  this.databasePath = databasePath || './database/';
  this.items = [];
}

Repository.prototype = {

  /**
   * Check if the data are available or it is
   * @param array
   * @return {boolean}
   */
  resultIsValid: function resultIsValid (array) {
    if (!array || array.length <= 0) {
      return false;
    }
    const currentTimeS = Math.floor(Date.now() / 1000);
    const itemTTL = parseInt(array[0].ttl, 10) + Math.floor(parseInt(array[0].created, 10) / 1000);
    return itemTTL >= currentTimeS;
  },
  /**
   * return boolean of test if the items is empty or not
   * @private
   * @return false if is not empty
   * @return true the array is empty
   */
  emptyItems: function emptyItems () {
    return this.items.length === 0;
  },

  /**
   * returns the content of the json file
   * @return null if nothing
   * @return {[*]} array of result
   */
  findAll: function findAll () {
    if (this.emptyItems()) {
      const data = this.read();
      if (data) {
        this.items = data.map((rawItemData) => {
          const item = new this.Model();
          item.fromData(rawItemData);
          return item;
        });
      }
    }
    return this.items;
  },

  /**
   * returns the content of the json file
   * give the result by filtring them
   * repository.findAllBy('languge', 'fr');
   * @return null if nothing
   * @return {{*}} array of result
   */
  findAllBy: function findAllBy (key, value) {
    this.findAll();
    if (!this.emptyItems()) {
      return this.items.filter(selectItem => (selectItem[key] === value));
    }
    return null;
  },

  /**
   * return the object if it exists
   * @see Repository::findAll()
   * @private
   * @return null if nothing
   * @return {} object
   */
  itemExists: function itemExists (key, value) {
    if (!this.findAllBy(key, value) || this.findAllBy(key, value).length === 0) {
      return false;
    }
    return true;
  },

  /**
   * add the object to the items
   * @private
   * @param item
   */
  add: function add (item) {
    this.items.push(item);
  },

  /**
   * save the item in a file
   * @param item
   * @private
   **/
  update: function update (item) {
    this.findAll();
    this.items = this.items.map((itemTemp) => {
      if (item.id === itemTemp.id) {
        return item;
      }
      return itemTemp;
    });
  },

  /**
   * save the items in a file
   * @see Repository::save
   * @param items
   **/
  saveAll: function saveAll (items) {
    items.forEach((itemData) => {
      const item = new this.Model();
      if (!(itemData instanceof this.Model)) {
        item.fromJson(itemData);
      }
      if (this.itemExists('id', item.id)) {
        this.update(item);
      } else {
        this.add(item);
      }
    });
    this.write();
  },

  /**
   * write on file
   * @private
   */
  write: function write () {
    fs.writeFileSync(
      `${this.databasePath}${this.Model.getName()}.json`, `[${this.items.map(item => item.toJson()).join(',')}]`);
  },

  /**
   * read the file
   * @private
   */
  read: function read () {
    try {
      return JSON.parse(fs.readFileSync(`${this.databasePath}${this.Model.getName()}.json`));
    } catch (err) {
      return null;
    }
  },
};

module.exports = Repository;
