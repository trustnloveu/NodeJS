//* External Libraries
const bcrypt = require("bcryptjs");

//* Models
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  let errorMessage = req.flash("login-error");

  if (errorMessage.length > 0) errorMessage = errorMessage[0];
  else errorMessage = undefined;

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    errorMessage: errorMessage,
    // isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  //! Cookie
  // res.setHeader("Set-Cookie", "login=true"); //! ; Max-age=10 ; Expires=Date ; Domain= ; Secure ...

  //! Session
  const email = req.body.email;
  const password = req.body.password;
  const errorMessage = "Invalid eamil or passowrd.";

  User.findOne({ email: email })
    .then((user) => {
      // Eamil Correction
      if (!user) {
        req.flash("login-error", errorMessage);
        return res.redirect("/login");
      }

      // Password Correction (by comparing hashed password)
      bcrypt
        .compare(password, user.password)
        .then((isMatch) => {
          if (!isMatch) {
            req.flash("login-error", errorMessage);
            return res.redirect("/login");
          }

          req.session.isLogin = true;
          req.session.user = user;

          // (Optional) When you'd like to redirect views, and make it clear redirecting page after the session is saved
          return req.session.save((error) => {
            if (error) console.log("Session Save Error ::: " + error);
            return res.redirect("/");
          });
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((error) => {
      console.log(error);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error);

    res.redirect("/");
  });
};

exports.getSignUp = (req, res, next) => {
  let errorMessage = req.flash("signup-error");

  if (errorMessage.length > 0) errorMessage = errorMessage[0];
  else errorMessage = undefined;

  res.render("auth/signup", {
    path: "/signup",
    pageTitle: "Sign-Up",
    errorMessage: errorMessage,
    // isAuthenticated: false,
  });
};

exports.postSignUp = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;

  const eamilErrorMessage =
    "The Email is already registered, please input another one.";
  const comparePasswordErrorMessage = "The passwords doesn't match.";

  // Password Check
  if (!(password === confirmPassword)) {
    req.flash("signup-error", comparePasswordErrorMessage);
    return res.redirect("/signup");
  }

  // email validation
  User.findOne({ email: email })
    .then((user) => {
      // Email Check
      if (user) {
        req.flash("signup-error", eamilErrorMessage);
        return res.redirect("/signup");
      }

      // Hash Password
      return bcrypt
        .hash(password, 12)
        .then((hashedPassword) => {
          const newUser = new User({
            email: email,
            password: hashedPassword,
            // cart: { items: []} //! Cart will automatically set as it defined in User Schema
          });

          return newUser.save();
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .then((result) => {
      res.redirect("/login");
    })
    .catch((error) => {
      console.log(error);
    });
};
