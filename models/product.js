const { ObjectId } = require("mongodb");
const { getDb } = require("../util/db");

//* Class
class Product {
  //* constructor
  constructor(title, price, imageUrl, description, id) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this._id = id;
  }

  //* save
  save() {
    const db = getDb();
    let dbOp;

    // Update
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: this._id }, { $set: this }); // _id -> ObjectId
    }
    // Insert
    else {
      dbOp = db.collection("products").insertOne(this);
    }
    // Result
    return dbOp
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //* fetchAll
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        return products;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //* findById
  static findById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: ObjectId(productId) })
      .next()
      .then((product) => {
        return product;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //* deleteOne
  static deleteOne(productId) {
    const db = getDb();
    return db.collection("products");
  }
}

module.exports = Product;
