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
    "mongodb+srv://trustnloveu:didtk9310%40@cluster0.uchgl.mongodb.net/node-udemy?retryWrites=true&w=majority"
  )
  .then((result) => {
    app.listen(3000);
  })
  .catch((error) => {
    console.log(error);
  });

// mongoConnect(() => {
//   // Create Default User
//   const db = getDb();

//   db.listCollections({ name: "users" }).next((error, collectionInfo) => {
//     if (collectionInfo) {
//       console.log("User Collection Found");
//     } else {
//       const defaultUser = new User(null, "Austin", "trustnloveu@gmail.com");
//       defaultUser.save();
//     }
//   });

//   app.listen(3000);
// });
