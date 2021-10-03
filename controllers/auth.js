exports.getLogin = (req, res, next) => {
  //   const isLogin = req.get("Cookie").split(";")[0].trim().split("=")[1]; // split(;) > index > find > split(=) > value

  //   let isLogin;

  //   const cookie = req.get("Cookie");
  //   const cookieArray = cookie.split(";");

  //   cookieArray.forEach((element) => {
  //     const isLoginIncluded = element.includes("login=");
  //     if (isLoginIncluded) isLogin = element.split("=")[1];
  //   });

  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.isAuthenticated,
  });
};

exports.postLogin = (req, res, next) => {
  //! Cookie
  res.setHeader("Set-Cookie", "login=true"); //! ; Max-age=10 ; Expires=Date ; Domain= ; Secure ...

  res.redirect("/");
};
