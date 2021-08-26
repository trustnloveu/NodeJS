//* Route > /
const express = require("express");
const router = express.Router();

// Controllers
const productsController = require("../controllers/products");

// GET : /
router.get("/", productsController.getProducts);

module.exports = router;
