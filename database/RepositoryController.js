class RepositoryController {

  constructor(db, modelName) {
    this.db = db;
    this.modelName = modelName;
    this.model = require(`./models/${this.modelName}`);
  }

  createCollection() {
    return this.db.createCollection(this.modelName);
  }

  dropCollection() {
    return this.db.collection(this.modelName).drop();
  }

  findAll() {
    return this.db.collection(this.modelName).find({});
  }

  findById(id) {
    return this.db.collection(this.modelName).find({ id });
  }

  findByValues(object) {
    return this.db.collection(this.modelName).find(object);
  }

  insertOne(object) {
    const exist = this.findById(object.id);
    return exist || this.db.collection(this.modelName).insert(object);
  }

  updateOne(object) {
    const exist = this.findById(object.id);
    return exist && this.db.collection(this.modelName).updateOne({ id: object.id }, object);
  }

  deleteOne(id) {
    const exist = this.findById(id);
    return exist && this.db.collection(this.modelName).deleteOne(id);
  }
}

module.exports = RepositoryController;
