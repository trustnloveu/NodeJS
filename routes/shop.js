//* Route > /
const express = require("express");
const router = express.Router();

// Controllers
const shopController = require("../controllers/shop");

// GET : /
router.get("/", shopController.getIndex);

// GET : /products
router.get("/products", shopController.getProducts);

// GET : /cart
router.get("/cart", shopController.getCart);

// GET : /orders
router.get("/orders", shopController.getOrders);

// GET : /checkout
router.get("/checkout", shopController.getCheckout);

//* Export
module.exports = router;
