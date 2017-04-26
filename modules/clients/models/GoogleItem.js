function GoogleItem () {
  // properties of a specific instance
  this.created = '';
  this.ttl = '';
  this.id = '';
  this.source_search = 'google';
  this.model = '';
  this.data = '';
  this.source = '';
}

/**
 * @private
 * @return the name of the model item
 */
GoogleItem.getName = function getName () {
  return 'clients';
};

/**
 * @private
 * @return the ttl of the data
 */
GoogleItem.getTTL = function getTTL () {
  return 14400;
};

GoogleItem.prototype = {

  /**
   * It convert the the current object model
   * into a json.
   */
  toJson: function toJson () {
    return JSON.stringify({
      created: this.created,
      ttl: this.ttl,
      date: this.date,
      id: this.id,
      source_search: this.source_search,
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
  fromData: function fromData (data) {
    this.created = data.created;
    this.ttl = data.ttl;
    this.id = data.id;
    this.source_search = data.source_search;
    this.model = data.model;
    this.data = data.data;
    this.source = data.source;
    this.link = data.link;
    this.title = data.title;
    this.date = data.date;
  },

  /**
   * It convert the json on a WeatherItem format
   * @param json is the object that it will be converted
   */
  fromJson: function fromJson (json) {
    this.date = json.pubDate;
    this.created = Date.now();
    this.ttl = GoogleItem.getTTL();
    this.model = GoogleItem.getName();
    this.id = json.guid;
    this.title = json.title;
    this.data = json.contentSnippet;
    this.link = json.link;
    this.source = json.source;
  },

};

module.exports = GoogleItem;
