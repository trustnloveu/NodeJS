//* Route > /admin
const express = require("express");
const router = express.Router();

// Controllers
const adminController = require("../controllers/admin");

// GET : /admin/add-product
router.get("/add-product", adminController.getAddProduct);

// GET : /admin/list-product
router.get("/list-product", adminController.getProducts);

// GET : edit-product
router.get("/edit-product/:productId", adminController.getEditProduct);

// POST : add-product
router.post("/add-product", adminController.postAddProduct);

//* Export
module.exports = router;

// exports.routes = router;
// exports.products = products;
