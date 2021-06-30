// Node Core Modules

// http     : Launch a server, send request
// https    : Launch a SSL server
// fs       : 
// path
// os

const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    process.exit();
});

server.listen(3000);