const { ObjectId } = require("mongodb");
const { getDb } = require("../util/db");

//* Class
class User {
  //* constructor
  constructor(id, name, email, cart) {
    this._id = id ? ObjectId(id) : null;
    this.name = name;
    this.email = email;
    this.cart = cart; // { items : [ ] }
  }

  //* save
  save() {
    const db = getDb();

    return db
      .collection("users")
      .insertOne(this)
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //* findById
  findById(userId) {
    const db = getDb();

    return db
      .collection("users")
      .findOne({ _id: ObjectId(userId) }) // findOne = find -> next()
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //* addToCart
  addToCart(product) {
    // const cartProduct = this.cart.items.findIndex((item) => {
    //   return item._id === product._id;
    // });

    const updatedCart = { items: [{ ...product, quantity: 1 }] };

    const db = getDb();

    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: updatedCart } })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = User;
