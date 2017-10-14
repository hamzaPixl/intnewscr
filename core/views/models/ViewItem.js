class ViewItem {

  constructor(id, start, end, name, widgets) {
    this.id = id;
    this.start = start;
    this.end = end;
    this.name = name;
    this.model = 'view';
    this.widgets = widgets;
  }
}

module.exports = ViewItem;
