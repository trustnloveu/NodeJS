const path = require("path");
const rootDir = require("../util/path");

const express = require("express");
const router = express.Router();

//* Route > /

const adminData = require("./admin");

// GET : /
router.get("/", (req, res, next) => {
  //* Data to pass
  const products = adminData.products;

  //* to load .html file
  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
  // res.sendFile(path.join(rootDir, "views", "shop.html"));

  //* to render .pug file
  res.render("shop", { prods: products, pageTitle: "Shop" });
});

module.exports = router;
