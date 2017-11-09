const moment = require('moment');

class Weather {

  constructor() {
    this.collection = 'weathers';
    this.id = null;
    this.ttl = null;
    this.created_at = null;
    this.astronomy = null;
    this.location = null;
    this.units = null;
    this.wind = null;
    this.code = null;
    this.date = null;
    this.day = null;
    this.high = null;
    this.low = null;
    this.text = null;
  }

  /**
   * Return the item with apiPayload values
   * @returns this
   * @memberof Weather
   */
  fromApiPayload(apiPayload) {
    this.id = apiPayload.date;
    this.created_at = moment().format();
    this.ttl = moment().add(1, 'd').format();
    this.astronomy = apiPayload.astronomy || '';
    this.location = apiPayload.location || '';
    this.units = apiPayload.units || '';
    this.wind = apiPayload.wind || '';
    this.code = apiPayload.code || '';
    this.date = apiPayload.date || '';
    this.day = apiPayload.day || '';
    this.high = apiPayload.high || '';
    this.low = apiPayload.low || '';
    this.text = apiPayload.text || '';
  }

  /**
   * Return the item with dbPayload values
   * @returns this
   * @memberof Weather
   */
  fromdbPayload(dbPayload) {
    this.id = dbPayload.id;
    this.ttl = typeof dbPayload.ttl === 'object' ? moment(dbPayload.ttl).format() : dbPayload.ttl;
    this.created_at = typeof dbPayload.created_at === 'object' ? moment(dbPayload.created_at).format() : dbPayload.created_at;
    this.astronomy = dbPayload.astronomy;
    this.location = dbPayload.location;
    this.units = dbPayload.units;
    this.wind = dbPayload.wind;
    this.code = dbPayload.code;
    this.date = dbPayload.date;
    this.day = dbPayload.day;
    this.high = dbPayload.high;
    this.low = dbPayload.low;
    this.text = dbPayload.text;
  }

  /**
   * Return the json object corresponding to this
   * @returns JSON object
   * @memberof Weather
   */
  itemToJson() {
    return {
      id: this.id,
      ttl: typeof this.ttl === 'object' ? moment(this.ttl).format() : this.ttl,
      created_at: typeof this.created_at === 'object' ? moment(this.created_at).format() : this.created_at,
      astronomy: this.astronomy,
      location: this.location,
      units: this.units,
      wind: this.wind,
      code: this.code,
      date: this.date,
      day: this.day,
      high: this.high,
      low: this.low,
      text: this.text,
    };
  }

  /**
   * Check if the data is always valid by his ttl
   * @returns boolean
   * @memberof Weather
   */
  isValid() {
    return this.creadted_at.unix() < this.ttl.unix();
  }

  /**
   * Return the collection name in database
   * @returns name of the collection
   * @memberof Weather
   */
  getCollection() {
    return this.collection;
  }

}

module.exports = Weather;
