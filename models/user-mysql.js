//* DB
const db = require("../util/db");

//* Export
module.exports = class User {
  // constructor
  constructor(name) {
    this.name = name;
    this.email = email;
  }

  // save
  save() {
    return db.execute("INSERT INTO users (name, email) values (?, ?)", [
      this.name,
      this.email,
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
