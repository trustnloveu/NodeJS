const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");

//* GET > /login
router.get("/login", authController.getLogin);

//* POST > /login
router.post("/login", authController.postLogin);

//* POST > /logout
router.post("/logout", authController.postLogout);

//* GET > /signup
router.get("/signup", authController.getSignUp);

//* POST > /signup
router.post("/signup", authController.postSignUp);

//* GET > /reset
router.get("/reset", authController.getReset);

//* POST > /reset
router.post("/reset", authController.postReset);

module.exports = router;
