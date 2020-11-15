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
  console.log(req.body.direction);
  console.log(userSelectedDirPosition.length);
  if (direction === "back" && userSelectedDirPosition.length) {
    if (userSelectedDirPosition.length > 2) userSelectedDirPosition.pop(); // only pop if we're one level up from the root
    if (userSelectedDirPosition.length > 1) userSelectedDirPosition.pop(); // pop twice to get rid of forward slash // if length is 1, we're back at the root of the drive
  }
  if (direction === "forward") {
    if (userSelectedDirPosition.length) {
      if (userSelectedDirPosition.length > 1) userSelectedDirPosition.push("/");
      userSelectedDirPosition.push(`${_path}`);
    } else {
      userSelectedDirPosition.push(_path);
    }
  }
  console.log(userSelectedDirPosition.join(""));
  return readDir(userSelectedDirPosition.join(""), res);
});

server.listen(port);
console.debug("Server listening on port " + port);
