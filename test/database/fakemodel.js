const moment = require('moment');

class FakeModel {
  constructor() {
    this.collection = 'fakeCollections';
    this.id = 'id';
    this.creadted_at = moment();
    this.updated_at = moment();
    this.ttl = moment().add(2, 'd');
  }

  fromDbPayload(dbPayload) {
    this.id = dbPayload.id || null;
    this.creadted_at = dbPayload.creadted_at || null;
    this.updated_at = dbPayload.updated_at || null;
    this.ttl = dbPayload.ttl || null;
    return this;
  }

  itemToJson() {
    return {
      id: this.id,
      creadted_at: this.creadted_at.format(),
      updated_at: this.updated_at.format(),
      ttl: `${this.ttl}ttl`,
    };
  }

  isValid() {
    return this.creadted_at.unix() < this.ttl.unix();
  }

  getCollection() {
    return this.collection;
  }

  validationPayload(payload) {
    if (payload.creadted_at && typeof payload.creadted_at !== 'object') {
      return false;
    }
    if (payload.updated_at && typeof payload.updated_at !== 'object') {
      return false;
    }
    if (payload.ttl && typeof payload.ttl !== 'object') {
      return false;
    }
    if (payload.id && typeof payload.id !== 'string') {
      return false;
    }
    return true;
  }
}

module.exports = FakeModel;
