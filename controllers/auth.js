exports.getLogin = (req, res, next) => {
  console.log(req.session);

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.isAuthenticated,
  });
};

exports.postLogin = (req, res, next) => {
  //! Cookie
  res.setHeader("Set-Cookie", "login=true"); //! ; Max-age=10 ; Expires=Date ; Domain= ; Secure ...

  //! Session
  req.session.isLogin = true;

  res.redirect("/");
};
