const { getDb } = require("../util/db");
const { ObjectId } = require("mongodb");

//* Class
class Cart {
  //* constructor
  constructor() {}

  //* save
  save() {}

  //* fetchAll
  static fetchAll() {
    const db = getDb();

    return db
      .collection("carts")
      .find()
      .toArray()
      .then((carts) => {
        console.log("================ GET CARTS");
        console.log(carts);
        return carts;
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
