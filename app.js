const express = require("express");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

// app.use(express.json()); //{ limit: '50mb' }
app.use(express.urlencoded({ extended: false }));

app.use("/admin", adminRoutes);
app.use("/shop", shopRoutes);

// 404 : Page not found
app.use((req, res, next) => {
  res.status(404).send("<h3>Page not found</h3>");
});

app.listen(3000);

// Note =========================================

//* Node Core Modules

// http     : Launch a server, send request
// https    : Launch a SSL server
// fs       :
// path
// os

//* Modules
// const http = require("http");
// const routes = require("./routes");

// const server = http.createServer(app); // routes > app
// server.listen(3000);
