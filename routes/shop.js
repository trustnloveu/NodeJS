//* Route > /
const express = require("express");
const router = express.Router();

// Controllers
const shopController = require("../controllers/shop");

// GET : /
router.get("/", shopController.getIndex);

// GET : /products
router.get("/products", shopController.getProducts);

// GET : /products/delete
// router.get("/products/delete", shopController.getProductDetail);

// GET : /products/
router.get("/products/:productId", shopController.getProductDetail);

// GET : /cart
// router.get("/cart", shopController.getCart);

// POST : /cart
// router.post("/cart", shopController.postCart);

// POST} : /cart-delete-item
// router.post("/cart-delete-item", shopController.postCartDelete);

// GET : /orders
// router.get("/orders", shopController.getOrders);

// POST : /create-order
// router.post("/create-order", shopController.postOrder);

// GET : /checkout
// router.get("/checkout", shopController.getCheckout);

//* Export
module.exports = router;
