const path = require("path");

const express = require("express");

const app = express();

//* Settings
app.set("view engine", "ejs");
app.set("views", "views"); // default = views

//* Routes
const adminData = require("./routes/admin"); // { routes, products }
const shopRoutes = require("./routes/shop");

//* Utils
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//* Navigations
app.use("/admin", adminData.routes);
app.use(shopRoutes);

// 404 : Page not found
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: null }); // path is for ejs 404 page
});

//* Port
app.listen(3000);
