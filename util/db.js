const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "node-udemy",
  password: "Didtk9310@",
});

module.exports = pool.promise();
