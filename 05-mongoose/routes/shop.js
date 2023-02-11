//* Route > /
const express = require("express");
const router = express.Router();

//* Controllers
const shopController = require("../controllers/shop");

//* Middlewares
const isAuth = require("../middlewares/is-auth");

// GET : /
router.get("/", shopController.getIndex);

// GET : /products
router.get("/products", shopController.getProducts);

// GET : /products/delete
// router.get("/products/delete", shopController.getProductDetail);

// GET : /products/
router.get("/products/:productId", shopController.getProductDetail);

// GET : /cart
router.get("/cart", isAuth, shopController.getCart);

// POST : /cart
router.post("/cart", isAuth, shopController.postCart);

// POST : /cart-delete-item
router.post("/cart-delete-item", isAuth, shopController.postCartDelete);

// GET : /orders
router.get("/orders", isAuth, shopController.getOrders);

// POST : /create-order
router.post("/create-order", isAuth, shopController.postOrder);

// GET : /checkout
// router.get("/checkout", shopController.getCheckout);

//* Export
module.exports = router;
