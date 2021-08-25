const path = require("path");

const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

// Routes ...
// ...

// Express Settins
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Navigations
// ...

// 404 Page
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: null });
});

// Port
app.listen(3000);
