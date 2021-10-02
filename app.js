const path = require("path");

const express = require("express");
const app = express();
const mongoose = require("mongoose");

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
const user = require("./models/user");

//* Utils
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

//* Middlewares
// app.use((req, res, next) => {
// const db = getDb();
// // set inital user
// db.collection("users")
//   .find()
//   .next()
//   .then((user) => {
//     if (user) {
//       req.user = new User(user._id, user.name, user.email, user.cart);
//       next();
//     }
//   })
//   .catch((error) => {
//     console.log(error);
//   });
// });

//* Navigations
app.use("/admin", adminRoutes);
app.use(shopRoutes);

//* 404 : Page not found
app.use(errorController.get404);

//* DB Connection & Port
mongoose
  .connect(
    "mongodb+srv://trustnloveu:didtk9310%40@cluster0.uchgl.mongodb.net/node-udemy?retryWrites=true&w=majority",
    {
      // useNewUrlParser: true,
      // useCreateIndex: true,
      // useUnifiedTopology: true,
    }
  )
  .then((result) => {
    return User.exists();
  })
  .then((isUserExist) => {
    console.log(isUserExist);

    if (!isUserExist) {
      const initialUser = new User({
        name: "Austin",
        email: "trustnloveu@gmail.com",
      });

      return initialUser.save();
    }
  })
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });
