const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

// Model
const Cart = require("./cart");

// filePath
const filePath = path.join(
  path.dirname(require.main.filename),
  "data",
  "products.json"
);

// getProductsFromFile
const getProductsFromFile = (callBack) => {
  fs.readFile(filePath, (error, fileContent) => {
    if (error) {
      callBack([]);
    } else {
      callBack(JSON.parse(fileContent));
    }
  });
};

//* export > Product (save, fetchAll)
module.exports = class Product {
  // constructor
  constructor(id, title, price, imageUrl, description) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
  }

  // save
  save() {
    getProductsFromFile((products) => {
      // if editing
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (item) => item.id === this.id
        );

        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this; // newly created Product instance

        fs.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
          console.log("Editing Product Error ::: " + error);
        });
      }
      // if adding
      else {
        this.id = uuid.v1(); // time-based unique id

        products.push(this);

        fs.writeFile(filePath, JSON.stringify(products), (error) => {
          console.log("Adding Product Error ::: " + error);
        });
      }
    });
  }

  // fetchAll
  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }

  // findById
  static findById(id, callBack) {
    getProductsFromFile((products) => {
      const product = products.find((item) => item.id === id);
      callBack(product);
    });
  }

  // deleteOne
  static deleteOne(id) {
    getProductsFromFile((products) => {
      const product = products.find((item) => item.id === id);
      const updatedProducts = products.filter((item) => item.id !== id);

      fs.writeFile(filePath, JSON.stringify(updatedProducts), (error) => {
        if (!error) {
          Cart.deleteProduct(id, product.price);
        } else {
          console.log("Delete Error ::: " + error);
        }
      });
    });
  }
};
