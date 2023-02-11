const path = require("path");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb+srv://trustnloveu:didtk9310%40@cluster0.uchgl.mongodb.net/node-udemy?retryWrites=true&w=majority";

//* Session
const session = require("express-session");
const csrf = require("csurf");
const MongoDBStore = require("connect-mongodb-session")(session);
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});
const csrfProtection = csrf();
const flash = require("connect-flash");

//* Models
const User = require("./models/user");

//* Settings
app.set("view engine", "ejs");
app.set("views", "views");

//* DB
// const { mongoConnect } = require("./util/db");
// const { getDb } = require("./util/db");

//* Controller
const errorController = require("./controllers/error");

//* Routes
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

//* Utils
app.use(express.urlencoded({ extended: false })); // body-parser
app.use(express.static(path.join(__dirname, "public"))); // static files
app.use(
  session({
    secret: "user secret",
    resave: false,
    saveUninitialized: false,
    store: store,
  }) // cookie: {Max-age, Expires, ...}
); // session
app.use(csrfProtection); // After you initalize session
app.use(flash());

//* Middlewares > Set User
app.use((req, res, next) => {
  // Login (seesion) Check
  if (!req.session.user) return next();

  // If Session is alive, Get User Data -> Attach to req.user
  //! Object included in Session Object is not the Object, which Mongoose to handle (Not a Mongoose Model giving funtionalities)
  //! So, you should query and set the Object through MongoDB
  User.findById(req.session.user._id)
    .then((user) => {
      req.user = user; //! user = Mongoose Model with Functionalities
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

//* Middlewares > Get Login Cookie
// app.use((req, res, next) => {
//   let isLogin;

//   const cookie = req.get("Cookie");
//   const cookieArray = cookie.split(";");

//   cookieArray.forEach((element) => {
//     const isLoginIncluded = element.includes("login=");
//     if (isLoginIncluded) {
//       isLogin = element.split("=")[1];
//     }
//   });

//   req.isAuthenticated = isLogin;
//   next();
// });

//* Middleware (csurf)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLogin;
  res.locals.csrfToken = req.csrfToken();
  next();
});

//* Navigations
app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

//* 404 : Page not found
app.use(errorController.get404);

//* DB Connection & Port
mongoose
  .connect(MONGODB_URI, {
    // useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
  })
  // .then((result) => {
  //   return User.exists();
  // })
  // .then((isUserExist) => {
  //   if (!isUserExist) {
  //     const initialUser = new User({
  //       name: "Austin",
  //       email: "trustnloveu@gmail.com",
  //     });

  //     return initialUser.save();
  //   }
  // })
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
