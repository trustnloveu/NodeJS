//* Models
const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: false,
  });
};

exports.postLogin = (req, res, next) => {
  //! Cookie
  // res.setHeader("Set-Cookie", "login=true"); //! ; Max-age=10 ; Expires=Date ; Domain= ; Secure ...

  //! Session
  User.findOne()
    .then((user) => {
      req.session.isLogin = true;
      req.session.user = user;
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((error) => {
    console.log(error);

    res.redirect("/");
  });
};
