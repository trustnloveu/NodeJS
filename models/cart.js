const fs = require("fs");
const path = require("path");

const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  // addProduct
  static addProduct(id, price) {
    fs.readFile(filePath, (error, fileContent) => {
      // Fetch the previous cart
      let cart = { products: [], totalPrice: 0 };

      if (!error) {
        cart = JSON.parse(fileContent);
      }

      // Analize the cart -> Find existing products
      const existingProductIndex = cart.products.findIndex(
        (item) => item.id === id
      );
      const existingProduct = cart.products[existingProductIndex];

      let updatedProduct;

      // Add new product, increase quantity
      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }
      cart.totalPrice = cart.totalPrice + +price;

      fs.writeFile(filePath, JSON.stringify(cart), (error) => {
        console.log("Editing Error ::: " + error);
      });
    });
  }

  // deleteProduct
  static deleteProduct(id, productPrice) {
    fs.readFile(filePath, (error, fileContent) => {
      if (error) {
        return;
      }

      const cart = JSON.parse(fileContent);

      const updatedCart = { ...cart };
      const product = updatedCart.products.find((item) => item.id === id);
      const productQty = product.qty;

      updatedCart.products = updatedCart.products.filter(
        (item) => item.id !== id
      );
      updatedCart.totalPrice - productPrice * productQty;

      fs.writeFile(filePath, JSON.stringify(updatedCart), (error) => {
        console.log("Delete Error :::: " + error);
      });
    });
  }
};
