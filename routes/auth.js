const express = require("express");

const { check } = require("express-validator");

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
router.post(
  "/signup",
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email.")
    .custom((value, { req }) => {
      if (value === "trustnloveu@gmail.com") {
        throw new Error("This is email is forbidden.");
      }
      return true;
    }),
  authController.postSignUp
);

//* GET > /reset
router.get("/reset", authController.getReset);

//* GET > /reset/:token
router.get("/reset/:token", authController.getNewPassword);

//* POST > /reset
router.post("/reset", authController.postReset);

//* POST > /new-password
router.post("/new-password", authController.postNewPassword);

module.exports = router;
