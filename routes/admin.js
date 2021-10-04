//* Route > /admin
const express = require("express");
const router = express.Router();

//* Controllers
const adminController = require("../controllers/admin");

//* Middlewares
const isAuth = require("../middlewares/is-auth");

// GET : /admin/list-product
router.get("/list-product", isAuth, adminController.getProducts);

// GET : /admin/add-product
router.get("/add-product", isAuth, adminController.getAddProduct);

// POST : add-product
router.post("/add-product", isAuth, adminController.postAddProduct);

// GET : edit-product
router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

// POST : edit-product
router.post("/edit-product", isAuth, adminController.postEditProduct);

// POST : delete-product
router.post("/delete-product", isAuth, adminController.deleteProduct);

//* Export
module.exports = router;

// exports.routes = router;
// exports.products = products;
