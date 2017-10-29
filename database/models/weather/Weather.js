class Weather {
  constructor() {
    this.collection = 'weathers';
    this.id = '';
  }

  /**
   * Return the item with dbpayload values
   * @returns this
   * @memberof Weather
   */
  fromDbPayload(dbPayload) {
    this.id = dbPayload.id || '';
    return this;
  }

  /**
   * Return the json object corresponding to this
   * @returns JSON object
   * @memberof Weather
   */
  itemToJson() {
    return JSON.stringify(this);
  }

  /**
   * Check if the data is always valid by his ttl
   * @returns boolean
   * @memberof Weather
   */
  isValid() {
    return true;
  }

  /**
   * Return the collection name in database
   * @returns name of the collection
   * @memberof Weather
   */
  getCollection() {
    return this.collection;
  }

  /**
   * Validating the json obect by differents rules
   * @param {any} payload
   * @memberof Weather
   */
  validationPayload(payload) {
    return payload;
  }
}

module.exports = Weather;
