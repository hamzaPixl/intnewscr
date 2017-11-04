const assert = require('assert');
const moment = require('moment');
const FakeModel = require('./FakeModel');
const database = require('../../database');
const logger = require('../../tools/logger');
const RepositoryController = require('../../database/RepositoryController');

describe('Database', () => {
  after(() => {
    describe.skip('Try to close the database', () => {
      it('should close the database instance and remove the instance', () => {
        database.close();
        const instanceDb = database.get();
        assert.equal(instanceDb, null);
      });
    });
  });
  describe('Model', () => {
    describe('::constructor', () => {
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
          creadted_at: moment(),
          updated_at: moment(),
          ttl: 'test',
        };
        const fake = fakemodel.fromDbPayload(dbPayload);
        const json = fakemodel.itemToJson();
        assert.ok(fake);
        assert.equal(json.collection, undefined);
        assert.equal(json.id, dbPayload.id);
        assert.equal(json.creadted_at, dbPayload.creadted_at.format());
        assert.equal(json.updated_at, dbPayload.updated_at.format());
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
  describe('Check the url for the connection', () => {
    it('should return the url of the connection', () => {
      assert.ok(process.env.DB_URL);
      assert.ok(process.env.DB_PORT);
      assert.ok(process.env.DB_NAME);
    });
  });

  database.connect()
  .then((db) => {
    describe('Try to connect to', () => {
      it('should successfuly connect to the database', () => {
        const instance = database.get();
        assert.ok(db);
        assert.ok(instance);
      });
    });
    describe('RepositoryController', () => {
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
              describe('::insertOne', () => {
                it('should insert the item in the fakemodel collection', () => {
                  const obj = fakemodel.itemToJson();
                  console.log(obj);
                  controller.insertOne(obj)
                    .then((res) => {
                      console.log(res);
                      assert.ok(res);
                      assert.equal(res.insertedCount, 1);
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
      });
      describe('::findAll', () => {
        const fakemodel = new FakeModel();
        const controller = new RepositoryController(instance, fakemodel);
        it('should find nothing', () => {
          controller.findAll().toArray()
            .then((result) => {
              assert.ok(result);
              assert.equal(result.length, 0);
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
    });
  })
  .catch((err) => {
    assert.fail(err);
  });
});
