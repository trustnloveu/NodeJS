const path = require("path");

const express = require("express");
const app = express();

//* Settings
app.set("view engine", "ejs");
app.set("views", "views");

//* DB
const sequelize = require("./util/db");

//* Models
const Product = require("./models/product-sequelize");
const User = require("./models/user-sequelize");

//* Controller
const errorController = require("./controllers/error");

//* Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//* Utils
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//* Navigations
app.use("/admin", adminRoutes);
app.use(shopRoutes);

//* 404 : Page not found
app.use(errorController.get404);

//* Associations
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);

//* DB Connection
sequelize
  .sync() // { force: true }
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Austin", email: "test@test.com" });
    }
    return Promise.resolve(user); // just `user` is fine
  })
  .then((user) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });

//* Port
// app.listen(3000);
