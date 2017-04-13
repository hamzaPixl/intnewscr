function ViewItem (id, ttl, name, widgets) {
  // properties of a specific instance
  this.id = id;
  this.ttl = ttl;
  this.name = name;
  this.model = 'view';
  this.widgets = widgets;
}

ViewItem.prototype = {};

module.exports = ViewItem;
