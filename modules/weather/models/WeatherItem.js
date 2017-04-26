function WeatherItem () {
  // properties of a specific instance
  this.created = '';
  this.ttl = '';
  this.id = '';
  this.model = '';
  this.date = '';
  this.max = '';
  this.min = '';
  this.description = '';
  this.day = '';
}

/**
 * @private
 * @return the name of the model item
 */
WeatherItem.getName = function getName () {
  return 'weather';
};

/**
 * @private
 * @return the ttl of the data
 */
WeatherItem.getTTL = function getTTL () {
  return 86400;
};

WeatherItem.prototype = {

  /**
   * It convert the the current object model
   * into a json.
   */
  toJson: function toJson () {
    return JSON.stringify({
      created: this.created,
      ttl: this.ttl,
      id: this.id,
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
  fromData: function fromData (data) {
    this.created = data.created;
    this.ttl = data.ttl;
    this.id = data.id;
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
  fromJson: function fromJson (json) {
    this.created = Date.now();
    this.ttl = WeatherItem.getTTL();
    this.model = WeatherItem.getName();
    this.id = json.date;
    this.date = json.date;
    this.max = json.high;
    this.min = json.low;
    this.description = json.text;
    this.day = json.day;
  },

};

module.exports = WeatherItem;
