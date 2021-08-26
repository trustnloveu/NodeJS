//* Route > /admin
const express = require("express");
const router = express.Router();

// Controllers
const productsController = require("../controllers/products");

// GET : add-product
router.get("/add-product", productsController.getAddProduct);

// POST : add-product
router.post("/add-product", productsController.postAddProducts);

//* Export
module.exports = router;

// exports.routes = router;
// exports.products = products;
