const crypto = require("crypto");

//* External Libraries
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

// Email Transporter (Send-Gird)
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      //   api_user: "trustnloveu@gmail.com", //! Error occurs
      api_key:
        "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",
    },
  })
);

// Email Sender
const emailSender = "trustnloveu@gmail.com";

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
        .then((result) => {
          // (Optional) You can redirect view after sending email by chaining another 'then' block
          res.redirect("/login");

          // Sending Email
          return transporter.sendMail({
            to: email,
            from: emailSender,
            subject: "Signup is completeed!",
            html: "<h4>You successfully signed up.</h4>",
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

exports.getReset = (req, res, next) => {
  let errorMessage = req.flash("reset-pw-error");

  if (errorMessage.length > 0) errorMessage = errorMessage[0];
  else errorMessage = undefined;

  res.render("auth/reset", {
    path: "/reset",
    pageTitle: "Reset Password",
    errorMessage: errorMessage,
  });
};

exports.postReset = (req, res, next) => {
  crypto.randomBytes(32, (error, buffer) => {
    if (error) {
      console.log(error);
      return res.redirect("/reset");
    }

    const token = buffer.toString("hex");
    const resetPasswordErrorMessage = "No account with this email";

    User.findOne({ email: req.body.email })
      .then((user) => {
        // Check User
        if (!user) {
          req.flash("reset-pw-error", resetPasswordErrorMessage);
          return res.redirect("/reset");
        }

        // Set Reset Token
        user.resetToken = token;
        user.resetTokenExpiration = Date.now() + 360000;

        // Save
        user.save();
      })
      .then((result) => {
        res.redirect("/");

        console.log("123");

        // Send Email
        return transporter.sendMail({
          to: req.body.email, // = user.email
          from: emailSender,
          subject: "Password Reset",
          html: `
            <p>You requested a password reset</p>
            <p>Click this <a href="http://localhost:3000/reset/${token}">LINK</a> to set a new password</p>
          `,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  });
};

exports.getNewPassword = (req, res, next) => {
  // To retrive toekn
  const token = req.params.token;

  // Validate token and ex-date of the token
  User.findOne({ resetToken: token, resetTokenExpiration: { $gt: Date.now() } })
    .then((user) => {
      // Error Message
      let errorMessage = req.flash("new-password-error");

      if (errorMessage.length > 0) errorMessage = errorMessage[0];
      else errorMessage = undefined;

      res.render("auth/new-password", {
        path: "/new-password",
        pageTitle: "New Password",
        errorMessage: errorMessage,
        userId: user._id.toString(),
      });
    })
    .catch((error) => {
      console.log(error);
    });
};
