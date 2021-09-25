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

  //* getCart
  getCart() {
    const db = getDb();

    const productIds = this.cart.items.map((item) => item.productId);

    return db
      .collection("products")
      .find({ _id: { $in: productIds } })
      .toArray()
      .then((products) => {
        return products.map((item) => {
          return {
            ...item, // product properties
            quantity: this.cart.items.find((cartItem) => {
              return cartItem.productId.toString() === item._id.toString();
            }).quantity,
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //* addToCart
  addToCart(product) {
    const cartProductIndex = this.cart.items.findIndex((item) => {
      return item.productId.toString() === product._id.toString(); // because ObjectId is out of JavaScript
    });

    let newQty = 1;
    const updatedCartItems = [...this.cart.items];

    // Item exists
    if (cartProductIndex >= 0) {
      newQty = this.cart.items[cartProductIndex].quantity + 1;

      updatedCartItems[cartProductIndex].quantity = newQty; // update
    }
    // Item doesn't exist
    else {
      // add new one
      updatedCartItems.push({
        productId: ObjectId(product._id),
        quantity: newQty,
      });
    }

    const updatedCart = {
      items: updatedCartItems,
    };

    // Update DB
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

  //* deleteCart
  deleteCart(productId) {
    const cartItems = [...this.cart.items];
    let filteredItems;

    const cartItemIndex = this.cart.items.findIndex((item) => {
      return item.productId.toString() === productId.toString();
    });

    console.log("cartItemIndex ::: ========================================");
    console.log(cartItemIndex);

    // Item exists
    if (cartItemIndex >= 0) {
      filteredItems = cartItems.filter(
        (item) => item.productId.toString() !== productId.toString()
      );

      console.log("filteredItems ::: ========================================");
      console.log(filteredItems);
    }
    // Item doesn't exist
    else {
      return;
    }

    // Update DB
    const db = getDb();

    const updatedCart = {
      items: filteredItems,
    };

    return db
      .collection("users")
      .updateOne({ _id: this._id }, { $set: { cart: filteredItems } })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}

module.exports = User;
