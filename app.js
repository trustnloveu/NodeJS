const path = require("path");

const express = require("express");
const app = express();

//* Settings
app.set("view engine", "ejs");
app.set("views", "views");

//* DB
const { mongoConnect } = require("./util/db");

//* Controller
const errorController = require("./controllers/error");

//* Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

//* Utils
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//* Middlewares
app.use((req, res, next) => {
  next();
});

//* Navigations
app.use("/admin", adminRoutes);
app.use(shopRoutes);

//* 404 : Page not found
app.use(errorController.get404);

//* DB Connection & Port
mongoConnect(() => {
  app.listen(3000);
});
