class RepositoryController {

  constructor(db, modelName) {
    this.db = db;
    this.modelName = modelName;
    this.model = require(`./models/${this.modelName}`);
  }

  /**
   * Create the collection
   * @returns Promise
   * @memberof RepositoryController
   */
  createCollection() {
    return this.db.createCollection(this.modelName);
  }

  /**
   * Drop the collection
   * @returns Promise
   * @memberof RepositoryController
   */
  dropCollection() {
    return this.db.collection(this.modelName).drop();
  }

  /**
   * Find all items in the document
   * @returns Promise
   * @memberof RepositoryController
   */
  findAll() {
    return this.db.collection(this.modelName).find({});
  }

  /**
   * Find an item with specific id
   * @param {any} id of the item
   * @returns Promise
   * @memberof RepositoryController
   */
  findById(id) {
    return this.db.collection(this.modelName).find({ id });
  }

  /**
   * Find all items that match with the query
   * @param {any} query that will be check
   * @returns Promise
   * @memberof RepositoryController
   */
  findByValues(query) {
    return this.db.collection(this.modelName).find(query);
  }

  /**
   * Insert one item in the collection
   * @param {any} object that will be insert if it doesn't exist
   * @returns Promise
   * @memberof RepositoryController
   */
  insertOne(object) {
    const exist = this.findById(object.id);
    return exist || this.db.collection(this.modelName).insert(object);
  }

  /**
   * Update an item in the collection if it exists
   * @param {any} object that contains the new values
   * @returns Promise
   * @memberof RepositoryController
   */
  updateOne(object) {
    const exist = this.findById(object.id);
    return exist && this.db.collection(this.modelName).updateOne({ id: object.id }, object);
  }

  /**
   * Delete an item from the collection
   * @param {any} id oh the item that will be deleted if it exists
   * @returns Promise
   * @memberof RepositoryController
   */
  deleteOne(id) {
    const exist = this.findById(id);
    return exist && this.db.collection(this.modelName).deleteOne(id);
  }
}

module.exports = RepositoryController;
