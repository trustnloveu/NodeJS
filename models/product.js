const fs = require("fs");
const path = require("path");

const products = [];

module.exports = class Product {
  // constructor
  constructor(title) {
    this.title = title;
  }

  // save
  save() {
    const filePath = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );

    fs.readFile(filePath, (error, fileContent) => {
      let products = [];

      if (!error) {
        products = JSON.parse(fileContent);
      }

      products.push(this);

      fs.writeFile(filePath, JSON.stringify(products), (error) => {
        console.log(error);
      });
    });
  }

  // fetchAll
  static fetchAll(callBack) {
    const filePath = path.join(
      path.dirname(require.main.filename),
      "data",
      "products.json"
    );

    fs.readFile(filePath, (error, fileContent) => {
      if (error) {
        callBack([]);
      }
      callBack(JSON.parse(fileContent));
    });

    return products;
  }
};
