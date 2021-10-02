const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//* Schema
const productSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

//* Export Model with Schema
module.exports = mongoose.model("Product", productSchema);

// const { ObjectId } = require("mongodb");
// const { getDb } = require("../util/db");

// //* Class
// class Product {
//   //* constructor
//   constructor(title, price, imageUrl, description, id, userId) {
//     this.title = title;
//     this.price = price;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this._id = id ? ObjectId(id) : null;
//     this.userId = userId;
//   }

//   //* save - insert, update
//   save() {
//     const db = getDb();
//     let dbOp;

//     // Update
//     if (this._id) {
//       dbOp = db
//         .collection("products")
//         .updateOne({ _id: this._id }, { $set: this }); // _id -> ObjectId
//     }
//     // Insert
//     else {
//       dbOp = db.collection("products").insertOne(this);
//     }
//     // Result
//     return dbOp
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   //* fetchAll
//   static fetchAll() {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find()
//       .toArray()
//       .then((products) => {
//         return products;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   //* findById
//   static findById(productId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .find({ _id: ObjectId(productId) })
//       .next()
//       .then((product) => {
//         return product;
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }

//   //* deleteById
//   static deleteById(productId) {
//     const db = getDb();
//     return db
//       .collection("products")
//       .deleteOne({ _id: ObjectId(productId) })
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }
// }

// module.exports = Product;
