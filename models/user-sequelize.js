const { DataTypes } = require("sequelize");
const uuid = require("uuid");

//* DB - Sequelize
const sequelize = require("../util/db");

//* Model
const User = sequelize.define("user-sequelize", {
  id: {
    defaultValue: uuid.v1(),
    primaryKey: true,
    unique: true,
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
