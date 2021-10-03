exports.getLogin = (req, res, next) => {
  const isLogin = req.get("Cookie").split(";")[0].trim().split("=")[1]; // split(;) > index > find > split(=) > value

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: isLogin,
  });
};

exports.postLogin = (req, res, next) => {
  //! Cookie
  res.setHeader("Set-Cookie", "login=true");

  res.redirect("/");
};
