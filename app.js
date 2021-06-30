//* Node Core Modules

// http     : Launch a server, send request
// https    : Launch a SSL server
// fs       :
// path
// os

//* Module
const http = require("http");
const routes = require("./routes");

//* Server
const server = http.createServer(routes);

server.listen(3000);
