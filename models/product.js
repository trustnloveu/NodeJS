const fs = require("fs");
const path = require("path");

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
  constructor(title) {
    this.title = title;
  }

  // save
  save() {
    getProductsFromFile((products) => {
      products.push(this);

      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }

  // fetchAll
  static fetchAll(callBack) {
    getProductsFromFile(callBack);
  }
};
