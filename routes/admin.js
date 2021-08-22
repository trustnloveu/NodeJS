const express = require("express");
const router = express.Router();

//* Route > /admin

// GET : add-product
router.get("/add-product", (req, res, next) => {
  console.log("Add Product Path");
  res.send(
    "<form action='/admin/add-product' method='POST'><input type='text' name='title'><button type=submit>Add Product</button></form>"
  );
});

// POST : add-product
router.post("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/shop");
});

module.exports = router;
