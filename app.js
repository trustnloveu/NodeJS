//* Node Core Modules

// http     : Launch a server, send request
// https    : Launch a SSL server
// fs       :
// path
// os

//* Modules
// const http = require("http");
// const routes = require("./routes");

const express = require("express");

const app = express();

// app.use(express.json()); //{ limit: '50mb' }
app.use(express.urlencoded({ extended: false }));

app.use("/add-product", (req, res, next) => {
  console.log("Add Product Path");
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title'><button type=submit>Add Product</button></form>"
  );
});

app.use("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  console.log("Root Path");
  res.send("<h3>Root Path</h3>");
});

app.listen(3000);

// const server = http.createServer(app); // routes > app
// server.listen(3000);
