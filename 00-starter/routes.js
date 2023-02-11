const fs = require("fs");

const requestHandler = (req, res) => {
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
      '<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Move</button></button></form>'
    );
    res.write("</body>");
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];

    //* data > chunk = <Buffer 6d 65 73 61 67 65 3d 74 65 73 74>
    req.on("data", (chunk) => {
      body.push(chunk);
    });

    //* end > parsed result > mesage = test
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split("=")[1];

      //* create file (Sync || Async)
      // fs.writeFileSync("message.txt", message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302; // res.writeHead(302);     > redirection
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }

  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My First Page</title></head>");
  res.write("<body><h1>Hello from My Node.js Server.</h1></body>");
  res.write("</html>");
  res.end();

  // process.exit();
};

//* Way 1
module.exports = requestHandler;

//* Way 2
// module.exports = {
//   handler: requestHandler,
//   someText: "Some text",
// };

//* Way 3-1
// module.exports.handler = requestHandler;
// module.exports.someText = "Some Text";

//* Way 3-2
// exports.handler = requestHandler;
// exports.someText = "Some Text";
