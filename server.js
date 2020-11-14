const http = require("http");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cloneRepo = require("./utils/cloneRepo");
const PACKS = require("./utils/packs");
const readDir = require("./utils/readDir");

const app = express();
const server = http.createServer(app);
const port = 3000;

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(express.static(path.join(__dirname, "assets"))); // Require static assets from public folder

app.set("view engine", "ejs");

app
  .route("/")
  .get((req, res) => {
    console.log("get");

    res.render("index", { packs: PACKS });
    // res.sendFile(path.join(__dirname + "/pack.html"));
  })
  .post((req, res) => {
    console.log("post");
    const directory = req.body.directory;
    const projectName = req.body.projectName;
    const pack = req.body.pack;
    return cloneRepo(directory, projectName, pack, res);
  });

let userSelectedDirPosition = [];

app.route("/dir").post((req, res) => {
  const direction = req.body.direction;
  const _path = req.body.path;
  if (direction === "back") {
    if (userSelectedDirPosition.length) {
      userSelectedDirPosition.pop();
    }
  } else {
    if (userSelectedDirPosition.length) {
      userSelectedDirPosition.push(`${_path}/`);
    } else {
      userSelectedDirPosition.push(_path);
    }
  }

  return readDir(userSelectedDirPosition.join(""), res);
});

server.listen(port);
console.debug("Server listening on port " + port);
