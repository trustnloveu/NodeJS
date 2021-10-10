const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  // name: {
  //   type: String,
  //   required: true,
  // },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  resetToken: {
    type: String,
  },
  resetTokenExpiration: {
    type: Date,
  },
  cart: {
    items: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});

//* methods ==================================================================================================

//* addToCart
userSchema.methods.addToCart = function (product) {
  //! Model is based on Schema, so [ this ] points to Model's instance
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
      productId: product._id, // Mongoose will automatically convert this String id to ObjectId
      quantity: newQty,
    });
  }

  const updatedCart = {
    items: updatedCartItems,
  };

  // Update DB
  this.cart = updatedCart;
  return this.save();
};

//* deleteCart
userSchema.methods.removeFromCart = function (productId) {
  const updatedCartItems = this.cart.items.filter((item) => {
    return item.productId.toString() !== productId.toString();
  });

  this.cart.items = updatedCartItems;

  return this.save();
};

//* clearCart
userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};

module.exports = mongoose.model("User", userSchema);
