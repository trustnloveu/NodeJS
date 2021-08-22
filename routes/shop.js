const path = require("path");
const rootDir = require("../util/path");

const express = require("express");
const router = express.Router();

//* Route > /

const adminData = require("./admin");

// GET : /
router.get("/", (req, res, next) => {
  // res.sendFile(path.join(__dirname, "..", "views", "shop.html"));
  // res.sendFile(path.join(rootDir, "views", "shop.html"));
  res.render("shop");
});

module.exports = router;
