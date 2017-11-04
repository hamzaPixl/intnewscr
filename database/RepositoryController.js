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
    return this.db.collection(this.collection).find({});
  }

  /**
   * Find an item with specific id
   * @param {any} id of the item
   * @returns Promise
   * @memberof RepositoryController
   */
  findById(id) {
    return this.db.collection(this.collection).find({ id });
  }

  /**
   * Find all items that match with the query
   * @param {any} query that will be check
   * @returns Promise
   * @memberof RepositoryController
   */
  findByValues(query) {
    return this.db.collection(this.collection).find(query);
  }

  /**
   * Insert one item in the collection
   * @param {any} object that will be insert if it doesn't exist
   * @returns Promise
   * @memberof RepositoryController
   */
  insertOne(object) {
    const exist = this.findById(object.id);
    if (!exist) {
      return this.db.collection(this.collection).insertOne(object);
    }
    return exist;
  }

  /**
   * Update an item in the collection if it exists
   * @param {any} object that contains the new values
   * @returns Promise
   * @memberof RepositoryController
   */
  updateOne(object) {
    const exist = this.findById(object.id);
    if (exist) {
      return this.db.collection(this.collection).updateOne({ id: object.id }, object);
    }
    return exist;
  }

  /**
   * Delete an item from the collection
   * @param {any} id oh the item that will be deleted if it exists
   * @returns Promise
   * @memberof RepositoryController
   */
  deleteOne(id) {
    const exist = this.findById(id);
    if (exist) {
      return this.db.collection(this.collection).deleteOne(id);
    }
    return exist;
  }
}

module.exports = RepositoryController;
