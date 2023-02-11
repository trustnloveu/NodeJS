//* Route > /admin
const express = require("express");
const router = express.Router();

// Controllers
const adminController = require("../controllers/admin");

// GET : /admin/list-product
router.get("/list-product", adminController.getProducts);

// GET : /admin/add-product
router.get("/add-product", adminController.getAddProduct);

// POST : add-product
router.post("/add-product", adminController.postAddProduct);

// GET : edit-product
router.get("/edit-product/:productId", adminController.getEditProduct);

// POST : edit-product
router.post("/edit-product", adminController.postEditProduct);

// POST : delete-product
router.post("/delete-product", adminController.deleteProduct);

//* Export
module.exports = router;

// exports.routes = router;
// exports.products = products;
