const assert = require('assert');
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
      creadted_at: this.creadted_at,
      updated_at: this.updated_at,
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


describe('Model', () => {
  describe('::Constructor', () => {
    const fakemodel = new FakeModel();
    it('should have an instance of the model', () => {
      assert.ok(fakemodel);
    });
    it('should have the right property', () => {
      assert.equal(fakemodel.collection, 'fakeCollections');
      assert.equal(fakemodel.id, 'id');
      assert.ok(fakemodel.creadted_at);
      assert.ok(fakemodel.updated_at);
      assert.ok(fakemodel.ttl);
    });
  });

  describe('::validationPayload', () => {
    it('should validate the payload for the object', () => {
      const fakemodel = new FakeModel();
      const dbPayload = {
        id: '12345',
        creadted_at: moment(),
        updated_at: moment(),
      };
      assert.ok(fakemodel.validationPayload(dbPayload));
    });
    it('should not validate the payload for the object', () => {
      const fakemodel = new FakeModel();
      const dbPayload = {
        id: 12345,
        creadted_at: moment(),
        updated_at: moment(),
      };
      assert.ok(!fakemodel.validationPayload(dbPayload));
    });
  });

  describe('::fromDbPayload', () => {
    it('should have the right property after the mapping', () => {
      const fakemodel = new FakeModel();
      const dbPayload = {
        id: '12345',
        creadted_at: fakemodel.creadted_at.add(2, 's'),
        updated_at: fakemodel.creadted_at.add(2, 's'),
      };
      const fake = fakemodel.fromDbPayload(dbPayload);
      assert.ok(fake);
      assert.equal(fakemodel.collection, 'fakeCollections');
      assert.equal(fakemodel.creadted_at, dbPayload.creadted_at);
      assert.equal(fakemodel.updated_at, dbPayload.updated_at);
      assert.equal(fakemodel.ttl, null);
    });
  });

  describe('::itemToJson', () => {
    it('should have the right property after the json return', () => {
      const fakemodel = new FakeModel();
      const dbPayload = {
        id: '12345',
        creadted_at: 'test',
        updated_at: 'test',
        ttl: 'test',
      };
      const fake = fakemodel.fromDbPayload(dbPayload);
      const json = fakemodel.itemToJson();
      assert.ok(fake);
      assert.equal(json.collection, undefined);
      assert.equal(json.id, dbPayload.id);
      assert.equal(json.creadted_at, dbPayload.creadted_at);
      assert.equal(json.updated_at, dbPayload.updated_at);
      assert.equal(json.ttl, `${dbPayload.ttl}ttl`);
    });
  });

  describe('::getCollection', () => {
    it('should return the name of the collection', () => {
      const fakemodel = new FakeModel();
      assert.ok(fakemodel);
      assert.equal(fakemodel.collection, 'fakeCollections');
    });
  });

  describe('::isValid', () => {
    it('should valid the item because the ttl is still far', () => {
      const fakemodel = new FakeModel();
      const dbPayload = {
        id: '12345',
        creadted_at: moment(),
        updated_at: moment(),
        ttl: moment().add(23, 'd'),
      };
      const fake = fakemodel.fromDbPayload(dbPayload);
      const json = fakemodel.itemToJson();
      assert.ok(fake);
      assert.ok(json);
      assert.ok(fakemodel.isValid());
    });
    it('should not valid the item because the ttl is too late', () => {
      const fakemodel = new FakeModel();
      const dbPayload = {
        id: '12345',
        creadted_at: moment(),
        updated_at: moment(),
        ttl: moment().subtract(5, 'd'),
      };
      const fake = fakemodel.fromDbPayload(dbPayload);
      const json = fakemodel.itemToJson();
      assert.ok(fake);
      assert.ok(json);
      assert.ok(!fakemodel.isValid());
    });
  });
});
