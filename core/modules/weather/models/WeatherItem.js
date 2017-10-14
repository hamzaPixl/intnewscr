class WeatherItem {
  constructor() {
    this.created = '';
    this.ttl = 86400;
    this.model = 'weather';
    this.id = '';
    this.model = '';
    this.date = '';
    this.max = '';
    this.min = '';
    this.description = '';
    this.day = '';
  }

  /**
   * It convert the the current object model
   * into a json.
   */
  toJson() {
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
  }

  /**
   * It convert the json data on a WeatherItem format
   * @param data come from database
   */
  fromData(data) {
    this.created = data.created;
    this.ttl = data.ttl;
    this.id = data.id;
    this.model = data.model;
    this.date = data.date;
    this.max = data.max;
    this.min = data.min;
    this.description = data.description;
    this.day = data.day;
  }

  /**
   * It convert the json on a WeatherItem format
   * @param json is the object that it will be converted
   */
  fromJson(json) {
    this.created = Date.now();
    this.ttl = 86400;
    this.model = 'weather';
    this.id = json.date;
    this.date = json.date;
    this.max = json.high;
    this.min = json.low;
    this.description = json.text;
    this.day = json.day;
  }

}

module.exports = WeatherItem;
