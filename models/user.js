const { ObjectId } = require("mongodb");
const { getDb } = require("../util/db");

//* Class
class User {
  //* constructor
  constructor(name, email, id) {
    this.name = name;
    this.email = email;
    this._id = id ? ObjectId(id) : null;
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
}

module.exports = User;
