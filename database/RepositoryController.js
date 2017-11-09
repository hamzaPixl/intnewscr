const { validateResult } = require('../tools/utils');

class RepositoryController {

  constructor(db, model) {
    this.db = db;
    this.model = model;
    this.collection = this.model.getCollection();
  }

  /**
   * Create the collection
   * @returns Promise
   * @memberof RepositoryController
   */
  createCollection() {
    return this.db.createCollection(this.collection);
  }

  /**
   * Drop the collection
   * @returns Promise
   * @memberof RepositoryController
   */
  dropCollection() {
    return this.db.collection(this.collection).drop();
  }

  /**
   * Find all items in the document
   * @returns Promise
   * @memberof RepositoryController
   */
  findAll() {
    return new Promise((resolve) => {
      this.db.collection(this.collection)
      .find({})
      .toArray()
      .then((result) => {
        if (validateResult(result)) {
          return resolve(result.map((item) => {
            this.model.fromdbPayload(item);
            return this.model.itemToJson();
          }));
        }
        return resolve([]);
      });
    });
  }

  /**
   * Find an item with specific id
   * @param {any} id of the item
   * @returns Promise
   * @memberof RepositoryController
   */
  findById(id) {
    return new Promise((resolve) => {
      this.db.collection(this.collection).find({ id })
      .then((result) => {
        if (validateResult(result)) {
          return resolve(result.map((item) => {
            this.model.fromdbPayload(item);
            return this.model.itemToJson();
          }));
        }
        return resolve([]);
      });
    });
  }

  /**
   * Find all items that match with the query
   * @param {any} query that will be check
   * @returns Promise
   * @memberof RepositoryController
   */
  findByValues(query) {
    return new Promise((resolve) => {
      this.db.collection(this.collection).find({ query })
      .then((result) => {
        if (validateResult(result)) {
          return resolve(result.map((item) => {
            this.model.fromdbPayload(item);
            return this.model.itemToJson();
          }));
        }
        return resolve([]);
      });
    });
  }

  /**
   * Insert one item in the collection
   * @param {object} object that will be insert
   * @returns Promise
   * @memberof RepositoryController
   */
  insertOne(object) {
    return new Promise((resolve) => {
      this.model.fromApiPayload(object);
      const toInsert = this.model.itemToJson();
      this.db.collection(this.collection).insertOne(toInsert).then(() => resolve(toInsert));
    });
  }

  /**
   * Insert many item in the collection
   * @param {array} objects that will be insert
   * @returns Promise
   * @memberof RepositoryController
   */
  insertMany(objects) {
    return new Promise((resolve) => {
      const toInsert = objects.map((item) => {
        this.model.fromApiPayload(item);
        return this.model.itemToJson();
      });
      this.db.collection(this.collection).insertMany(toInsert).then(() => resolve(toInsert));
    });
  }

  /**
   * Update an item in the collection if it exists
   * @param {any} object that contains the new values
   * @returns Promise
   * @memberof RepositoryController
   */
  updateOne(object) {
    return new Promise((resolve) => {
      const toUpdate = object.map((item) => {
        this.model.fromApiPayload(item);
        return this.model.itemToJson();
      });
      return this.db.collection(this.collection)
      .updateOne({ id: object.id }, toUpdate).then(() => resolve(toUpdate));
    });
  }

  /**
   * Delete an item from the collection
   * @param {any} id oh the item that will be deleted if it exists
   * @returns Promise
   * @memberof RepositoryController
   */
  deleteOne(id) {
    return this.db.collection(this.collection).deleteOne(id);
  }
}

module.exports = RepositoryController;
