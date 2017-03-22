function FacebookItem() {
  // properties of a specific instance
  this.id = '';
  this.created = '';
  this.ttl = '';
  this.model = '';
  this.data = '';
  this.source = '';
}

/**
* @private
* @return the name of the model item
*/
FacebookItem.getName = function getName() {
  return 'clients';
};

/**
* @private
* @return the ttl of the data
*/
FacebookItem.getTTL = function getTTL() {
  return 14400;
};

FacebookItem.prototype = {

  /**
  * It convert the the current object model
  * into a json.
  */
  toJson: function toJson() {
    return JSON.stringify({
      id: this.id,
      created: this.created,
      ttl: this.ttl,
      model: this.model,
      data: this.data,
      source: this.source,
    });
  },

  /**
  * It convert the json data on a WeatherItem format
  * @param data come from database
  */
  fromData: function fromData(data) {
    this.id = data.id;
    this.created = data.created;
    this.ttl = data.ttl;
    this.model = data.model;
    this.data = data.data;
    this.source = data.source;
  },

  /**
  * It convert the json on a WeatherItem format
  * @param json is the object that it will be converted
  */
  fromJson: function fromJson(json) {
    this.created = json.created_time;
    this.model = FacebookItem.getName();
    this.ttl = FacebookItem.getTTL();
    this.id = json.id;
    this.data = json.message;
    this.source = json.id.split('_')[0];
  },

};

module.exports = FacebookItem;
