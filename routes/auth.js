const express = require("express");

const { check, body } = require("express-validator"); //! req, header, cookie ...

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
  //! Either set sinle validator method or put multiple validation methods like check() in a form of array
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((value, { req }) => {
        if (value === "trustnloveu@gmail.com") {
          throw new Error("This is email is forbidden.");
        }
        return true;
      }),
    body(
      "password",
      "Please enter a valid password, in between 5 and 20 charaters." //! Default Error Message for all the chain below
    )
      .isLength({ min: 5, max: 20 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value === req.body.password) {
        throw new Error("Passwords doesn't match.");
      }
      return true;
    }),
  ],
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
