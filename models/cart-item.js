const { DataTypes } = require("sequelize");

const sequelize = require("../util/db");

const CartItem = sequelize.define("CartItem", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  quantity: DataTypes.INTEGER,
});

module.exports = CartItem;
