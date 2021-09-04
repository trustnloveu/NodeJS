const fs = require("fs");
const path = require("path");
const uuid = require("uuid");

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
          console.log(error);
        });
      }
      // if adding
      else {
        this.id = uuid.v1(); // time-based unique id

        products.push(this);

        fs.writeFile(filePath, JSON.stringify(products), (error) => {
          console.log(error);
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
};
