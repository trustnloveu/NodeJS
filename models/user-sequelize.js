const { DataTypes } = require("sequelize");

//* DB - Sequelize
const sequelize = require("../util/db");

//* Model
const User = sequelize.define("user-sequelize", {
  id: {
    primaryKey: true,
    unique: true,
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
