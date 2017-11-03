require('../../config').searchENV();
const moment = require('moment');
const assert = require('assert');
const database = require('../../database');
const logger = require('../../tools/logger');
const RepositoryController = require('../../database/RepositoryController');

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
describe('RepositoryController', () => {
  database.connect()
  .then((db) => {
    const instance = database.get();
    it('should get the instance of the database', () => {
      assert.ok(instance);
      assert.ok(db);
    });
    describe('::Constructor', () => {
      let controller = null;
      const fakemodel = new FakeModel();
      it('should create the repository controller for the fake model', () => {
        assert.equal(controller, null);
        controller = new RepositoryController(instance, fakemodel);
        assert.ok(controller);
      });
      it('should contains the collection, db and the model', () => {
        assert.ok(controller);
        assert.ok(controller.db);
        assert.ok(controller.model);
        assert.ok(controller.collection);
        assert.equal(controller.collection, 'fakeCollections');
      });
    });
    describe('::CreateCollection', () => {
      const fakemodel = new FakeModel();
      const controller = new RepositoryController(instance, fakemodel);
      it('should create the collection on the database with the model', () => {
        controller.createCollection()
          .then((collection) => {
            assert.ok(collection);
          })
          .catch((err) => {
            assert.fail(err);
            logger.log(err);
          });
      });
      it('should have a collection with the name of the model', () => {
        controller.db.collections()
          .then((collections) => {
            const result =
            collections.filter(collection => collection.s.name === controller.collection);
            assert.ok(result);
            assert.equal(result.length, 1);
            assert.equal(result[0].s.name, controller.collection);
          })
          .catch((err) => {
            assert.fail(err);
            logger.log(err);
          });
      });
    });
    describe('::DropCollection', () => {
      const fakemodel = new FakeModel();
      const controller = new RepositoryController(instance, fakemodel);
      it('should throw an error beacuse of trying to drop a not existing collection', () => {
        controller.collection = 'fake';
        controller.dropCollection()
          .catch((err) => {
            assert.fail(err);
            assert.ok(err);
          });
      });
      it('should have drop the collection', () => {
        controller.collection = fakemodel.getCollection();
        let items = 0;
        controller.db.collections()
          .then((collections) => {
            items = collections.length;
            assert.ok(items);
            controller.dropCollection()
            .catch((err) => {
              assert.fail(err);
              logger.log(err);
            });
            controller.db.collections()
            .then((results) => {
              assert.ok(results);
              assert.equal(results.length, items - 1);
            })
            .catch((err) => {
              assert.fail(err);
              logger.log(err);
            });
          })
          .catch((err) => {
            assert.fail(err);
            logger.log(err);
          });
      });
    });
  })
  .catch((err) => {
    assert.fail(err);
    logger.log(err);
  });
});
