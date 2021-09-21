//* DB
const db = require("../util/db");

//* External Modules
const uuid = require("uuid");

//* Export
module.exports = class User {
  // constructor
  constructor(name) {
    this.id = uuid.v1();
    this.name = name;
  }

  // save
  save() {
    return db.execute("INSERT INTO users (id, name) values (?, ?)", [
      this.id,
      this.name,
    ]);
  }

  // fetchAll
  static fetchAll() {
    return db.execute("SELECT * FROM users");
  }

  // findById
  static findById(id) {
    return db.execute("SELECT * FROM users WHERE id = ?", [id]);
  }

  // fetchAll
  static deleteOne(id) {
    return db.execute("DELETE * FROM users WHERE id = ?", [id]);
  }
};
