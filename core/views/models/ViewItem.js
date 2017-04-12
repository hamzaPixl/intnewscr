function ViewItem (id, ttl, name, views) {
  // properties of a specific instance
  this.id = id;
  this.ttl = ttl;
  this.name = name;
  this.model = 'view';
  this.views = views;
}

ViewItem.prototype = {};

module.exports = ViewItem;
