const path = require("path");

const express = require("express");
const app = express();

// const expressHbs = require("express-handlebars");

const users = [];

// app.set("view engine", "pug");

// app.engine("hbs", expressHbs({ defaultLayout: "main-layout", extname: "hbs" }));
// app.set("view engine", "hbs");

app.set("view engine", "ejs");
app.set("views", "views");

// Routes ...
// ...

// Express Settins
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Navigations
// index
app.get("/", (req, res, next) => {
  res.render("index", {
    pageTitle: "Add User",
  });
});

// users
app.get("/users", (req, res, next) => {
  res.render("users", {
    pageTitle: "Users",
    users: users,
    hasUsers: users.length > 0,
  });
});

// add-user
app.post("/add-user", (req, res, next) => {
  users.push({ name: req.body.username });
  res.redirect("/users");
});

// 404 Page
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: null });
});

// Port
app.listen(3000);
