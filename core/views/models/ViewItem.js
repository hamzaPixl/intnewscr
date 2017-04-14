function ViewItem (id, start, end, name, widgets) {
  // properties of a specific instance
  this.id = id;
  this.start = start;
  this.end = end;
  this.name = name;
  this.model = 'view';
  this.widgets = widgets;
}

ViewItem.prototype = {};

module.exports = ViewItem;
