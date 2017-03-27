function TokenItem () {
  // properties of a specific instance
  this.id = '';
  this.created = '';
  this.ttl = '';
  this.model = '';
  this.expires_in = '';
  this.token = '';
}

/**
 * @private
 * @return the name of the model item
 */
TokenItem.getName = function getName () {
  return 'facebook';
};

/**
 * @private
 * @return the ttl of the data
 */
TokenItem.getTTL = function getTTL () {
  return 14400;
};

TokenItem.prototype = {

  /**
   * It convert the the current object model
   * into a json.
   */
  toJson: function toJson () {
    return JSON.stringify({
      id: this.id,
      created: this.created,
      ttl: this.ttl,
      model: this.model,
      token: this.token,
      expires_in: this.expires_in,
    });
  },

  /**
   * It convert the json data on a WeatherItem format
   * @param data come from database
   */
  fromData: function fromData (data) {
    this.id = data.id;
    this.created = data.created;
    this.ttl = data.ttl;
    this.model = data.model;
    this.token = data.token;
    this.expires_in = data.expires_in;
  },

  /**
   * It convert the json on a WeatherItem format
   * @json is the object that it will be converted
   */
  fromJson: function fromJson (json) {
    this.created = Date.now();
    this.model = TokenItem.getName();
    this.ttl = TokenItem.getTTL();
    this.id = this.created;
    this.expires_in = json.expires_in;
    this.token = json.access_token;
  },

};

module.exports = TokenItem;
