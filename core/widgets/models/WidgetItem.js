function WidgetItem (id, ttl, name, request) {
  // properties of a specific instance
  this.id = id;
  this.ttl = ttl;
  this.name = name;
  this.model = 'widget';
  this.request = request;
}

WidgetItem.prototype = {};

module.exports = WidgetItem;
