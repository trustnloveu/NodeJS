const path = require("path");
const rootDir = require("../util/path");

const express = require("express");
const router = express.Router();

//* Route > /admin

const products = [];

// GET : add-product
router.get("/add-product", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "add-product.html"));
  // res.sendFile(path.join(rootDir, "views", "add-product.html"));

  res.render("add-product", { pageTitle: "Add Product" });
});

// POST : add-product
router.post("/add-product", (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
});

// module.exports = router;
exports.routes = router;
exports.products = products;
