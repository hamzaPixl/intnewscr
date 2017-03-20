function GoogleItem() {
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
GoogleItem.getName = function getName() {
  return 'clients';
};

/**
 * @private
 * @return the ttl of the data
 */
GoogleItem.getTTL = function getTTL() {
  return 14400;
};

GoogleItem.prototype = {

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
      link: this.link,
      title: this.title,
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
    this.link = data.link;
    this.title = data.title;
  },

    /**
     * It convert the json on a WeatherItem format
     * @param json is the object that it will be converted
     */
  fromJson: function fromJson(json) {
    this.created = json.pubDate;
    this.model = GoogleItem.getName();
    this.ttl = GoogleItem.getTTL();
    this.id = json.guid;
    this.title = json.title;
    this.data = json.contentSnippet;
    this.link = json.link;
    this.source = json.source;
  },

};

module.exports = GoogleItem;
