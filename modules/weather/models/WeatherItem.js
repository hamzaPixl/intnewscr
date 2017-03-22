function WeatherItem() {
  // properties of a specific instance
  this.id = '';
  this.created = '';
  this.ttl = '';
  this.model = '';
  this.date = '';
  this.max = '';
  this.min = '';
  this.precip = '';
  this.description = '';
  this.day = '';
}

/**
* @private
* @return the name of the model item
*/
WeatherItem.getName = function getName() {
  return 'weather';
};

/**
* @private
* @return the ttl of the data
*/
WeatherItem.getTTL = function getTTL() {
  return 14400;
};

WeatherItem.prototype = {

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
      date: this.date,
      day: this.day,
      max: this.max,
      min: this.min,
      description: this.description,
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
    this.date = data.date;
    this.max = data.max;
    this.min = data.min;
    this.description = data.description;
    this.day = data.day;
  },

  /**
  * It convert the json on a WeatherItem format
  * @param json is the object that it will be converted
  */
  fromJson: function fromJson(json) {
    this.created = Date.now();
    this.model = WeatherItem.getName();
    this.ttl = WeatherItem.getTTL();
    this.id = json.date;
    this.date = json.date;
    this.max = json.high;
    this.min = json.low;
    this.description = json.text;
    this.day = json.day;
  },

};

module.exports = WeatherItem;
