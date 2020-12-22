const fs = require("fs");
const path = require("path");
// const MyEventEmitter = require("./test/events-demo");
// console.log("Hello world");
// console.log(__dirname);
// fs.writeFile(
//   path.join(__dirname, "hello.txt"),
//   "hello world!! from file",
//   (err) => {
//     if (err) throw err;

//     console.log("file has been created");
//   }
// );
// const emitter = new MyEventEmitter();
// emitter.on("event", () => {
//   console.log("event emitted!");
// });
// emitter.emit("event");

const server = require("http");
const url = require("url");
const PORT = process.env.PORT || 5000;
server
  .createServer(function (req, res) {
    const uri = url.parse(req.url);

    // Getting the file extension
    const fileExt = path.extname(uri.href);

    switch (fileExt.toLowerCase()) {
      case ".css":
        fs.readFile(
          path.join(__dirname, "/public", `${uri.href}`),
          "utf8",
          (err, data) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/css" });
            res.end(data);
          }
        );

        break;

      case ".json":
        fs.readFile(
          path.join(__dirname, "/public", `${uri.href}.json`),
          "utf8",
          (err, data) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(data);
          }
        );
        break;

      case "": // html
        const content = fs.readFile(
          path.join(__dirname, "/public", `${uri.href}.html`),
          "utf8",
          (err, data) => {
            if (err) throw err;
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
          }
        );
        break;

      default:
        break;
    }
  })
  .listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
