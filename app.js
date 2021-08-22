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

app.use((req, res, next) => {
  console.log("In the middleware.");
  next();
});

app.use((req, res, next) => {
  console.log("In anohther middleware.");
  res.send("<h3>Hello from Express!</h3>");
});

app.listen(3000);

// const server = http.createServer(app); // routes > app
// server.listen(3000);
