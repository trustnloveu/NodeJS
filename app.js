// Node Core Modules

// http     : Launch a server, send request
// https    : Launch a SSL server
// fs       :
// path
// os

const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // console.log(req);
  // console.log(req.url);       /text
  // console.log(req.method);    GET
  // console.log(req.headers);   { request header info }

  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>My First Page</title></head>");
    res.write("<body>");
    res.write(
      '<form action="/message" method="POST"><input type="text" name="mesage"><button type="submit">Move</button></button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    // data > chunk = <Buffer 6d 65 73 61 67 65 3d 74 65 73 74>
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    // end > parsed result > mesage = test
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      // create file
      fs.writeFileSync("message.txt", message);
    });

    res.statusCode = 302; // res.writeHead(302);     > redirection
    res.setHeader("Location", "/");
    return res.end();
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from My Node.js Server.</h1></body>");
  res.write("</html>");
  res.end();

  // process.exit();
});

server.listen(3000);
