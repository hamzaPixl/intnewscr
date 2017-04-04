function WidgetItem (id, ttl, name, request) {
  // properties of a specific instance
  this.id = id;
  this.ttl = ttl;
  this.name = name;
  this.model = 'widget';
  this.request = request;
}

WidgetItem.prototype = {

  /**
   * It convert the the current object model
   * into a json.
   */
  toJson: function toJson () {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      ttl: this.ttl,
      model: this.model,
      request: this.request,
    });
  },

  /**
   * It convert the json data on a WidgetItem format
   * @param data come from database
   */
  fromData: function fromData (data) {
    this.id = data.id;
    this.ttl = data.ttl;
    this.model = data.model;
    this.name = data.name;
    this.request = data.request;
  },

  /**
   * It convert the json on a WidgetItem format
   * @param json is the object that it will be converted
   */
  fromJson: function fromJson (json) {
    this.ttl = json.ttl;
    this.model = json.model;
    this.request = json.request;
    this.name = json.name;
    this.id = json.id;
  },

};

module.exports = WidgetItem;
