const express = require("express");
const router = express.Router();

//* Route > /shop

// GET : /
router.get("/", (req, res, next) => {
  console.log("Root Path");
  res.send("<h3>Root Path</h3>");
});

module.exports = router;
